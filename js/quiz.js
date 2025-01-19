import { previousQuestionOutAnimation } from "./animations.js";
import { previousQuestionInAnimation } from "./animations.js";
import { nextQuestionOutAnimation } from "./animations.js";
import { nextQuestionInAnimation } from "./animations.js";

let quizQuestions = [];
let currentQuestionIndex = 0;

let barWidth = document.querySelector(".bar-width");
const nextQuestionBtns = document.querySelectorAll(".next-question-icon");
const previousQuestionBtns = document.querySelectorAll(
	".previous-question-icon"
);
const btnResults = document.querySelector(".btn-results");
const answersForm = document.querySelector(".answers");

let dogAttributes = {
	sociability: 3,
	playfulness: 3,
	energy: 3,
	needsActivity: 3,
	training: 3,
	approachToStrangers: 3,
	controlling: 3,
	barking: 3,
	canBeAlone: 3,
	goodWithKids: 3,
	goodWithPets: 3,
	adaptability: 3,
	stubborn: 3,
	lifeExpectancy: 0,
	availability: 0,
	combing: 0,
	shedding: 0,
	drooling: 0,
	size: [],
	coatLength: [],
};
let previousDogAttributes = { ...dogAttributes };

// fetches quiz questions from data
async function fetchQuizQuestions() {
	try {
		const response = await fetch("./data/quizQuestions.json");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		quizQuestions = await response.json();

		loadQuestion(currentQuestionIndex);
	} catch (error) {
		console.error("Error loading quiz questions:", error);
	}
}

// loads quiz question
function loadQuestion(questionIndex) {
	const answersForm = document.querySelector(".answers");
	const currentQuestion = quizQuestions[questionIndex];

	// sets progress bar width
	let width = (currentQuestionIndex + 1) * (100 / quizQuestions.length);
	barWidth.style.width = `${width}%`;

	// removes unnecessary arrows, adds result button
	if (questionIndex === 0) {
		previousQuestionBtns.forEach((btn) => {
			btn.classList.add("invisible");
		});
	} else {
		previousQuestionBtns.forEach((btn) => {
			btn.classList.remove("invisible");
		});
	}
	if (questionIndex === quizQuestions.length - 1) {
		nextQuestionBtns.forEach((btn) => {
			btn.classList.add("invisible");
		});
		btnResults.style.display = "block";
	} else {
		nextQuestionBtns.forEach((btn) => {
			btn.classList.remove("invisible");
		});
		btnResults.style.display = "none";
	}

	// updates question number
	document.querySelector(".current-question-number").textContent =
		currentQuestion.id;
	document.querySelector(".num-of-questions").textContent =
		quizQuestions.length;

	// updates question
	document.querySelector(".current-question-text").textContent =
		currentQuestion.question;

	// deletes previous answers
	answersForm.innerHTML = "";

	// removes alert
	if (answersForm.classList.contains("check-alert")) {
		answersForm.classList.remove("check-alert");
		answersForm.classList.remove("check-alert--last");
	}

	// adds new answers
	currentQuestion.answers.forEach((answer) => {
		const label = document.createElement("label");
		label.classList.add("answers__label");

		let input = document.createElement("input");

		if (currentQuestion.inputType === "radio") {
			input.type = "radio";
			input.name = "radio-answer";
			input.value = answer;

			// restores previously selected answer
			if (currentQuestion.userAnswerRadio === answer) {
				input.checked = true;
			}
		}

		if (currentQuestion.inputType === "checkbox") {
			input.type = "checkbox";
			input.name = "checkbox-answer";
			input.value = answer;

			// restores previously selected answer
			if (currentQuestion.userAnswersCheckbox.includes(answer)) {
				input.checked = true;
			}
		}

		const span = document.createElement("span");
		span.textContent = answer;

		label.append(input);
		label.append(span);
		answersForm.append(label);
	});

	// goes to next question after choosing answer after a small delay
	const answersInputs = answersForm.querySelectorAll(".answers__label input");

	answersInputs.forEach((input) => {
		input.addEventListener("click", () => {
			if (input.type === "radio") {
				setTimeout(() => {
					nextQuestionOutAnimation();
				}, 300);
				setTimeout(() => {
					nextQuestion();
					nextQuestionInAnimation();
				}, 1000)	
			}
		});
	});
}

// loads next quiz question
function nextQuestion() {
	// checks user answers and potentailly shows alert
	// for checkbox
	if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
		const checkedCheckboxes = document.querySelectorAll(
			`input[name="checkbox-answer"]:checked`
		);

		if (checkedCheckboxes.length === 0) {
			answersForm.classList.add("check-alert");
			return;
		}
	}
	// for radio
	if ("userAnswerRadio" in quizQuestions[currentQuestionIndex]) {
		const checkedRadio = document.querySelector(
			`input[name="radio-answer"]:checked`
		);

		if (checkedRadio === null) {
			answersForm.classList.add("check-alert");
			return;
		}
	}

	saveAnswers();
	currentQuestionIndex++;
	loadQuestion(currentQuestionIndex);
}

// loads previous quiz question
function previousQuestion() {
	resetScore();
	saveAnswers();
	currentQuestionIndex--;
	if (currentQuestionIndex < 0) {
		currentQuestionIndex++;
	}
	loadQuestion(currentQuestionIndex);
}

// saves answers for current question
function saveAnswers() {
	// saves checkbox answers to quizQuestions array
	if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
		const checkboxAnswers = document.querySelectorAll(
			`input[name="checkbox-answer"]:checked`
		);
		if (checkboxAnswers.length > 0) {
			quizQuestions[currentQuestionIndex].userAnswersCheckbox = [];
			checkboxAnswers.forEach((input) =>
				quizQuestions[currentQuestionIndex].userAnswersCheckbox.push(
					input.nextElementSibling.textContent.trim()
				)
			);
		}
	}

	// saves radio answer to quizQuestions array
	if ("userAnswerRadio" in quizQuestions[currentQuestionIndex]) {
		const radioAnswer = document.querySelector(
			`input[name="radio-answer"]:checked`
		);
		if (radioAnswer !== null) {
			quizQuestions[currentQuestionIndex].userAnswerRadio =
				radioAnswer.nextElementSibling.textContent.trim();
		}
	}

	// shows object and user score in console
	console.log(quizQuestions[currentQuestionIndex]);
}

// handles score for a question
function handleScore(questionId, userAnswer, type) {
	// finds proper question
	const question = quizQuestions.find((q) => q.id === questionId);
	// checks type
	const isRadio = type === "radio";
	// assigns user answer/answers of proper type
	const answers = isRadio ? [userAnswer] : userAnswer;

	// checks user answers and changes dogAttributes
	answers.forEach((answer) => {
		const answerIndex = question.answers.indexOf(answer);
		if (answerIndex >= 0) {
			const effects = question.effects[answerIndex];

			Object.entries(effects).forEach(([key, value]) => {
				if (value === 0) {
					// sets to 0 instead of adding for indifferent to user values
					dogAttributes[key] = 0;
				} else if (Array.isArray(dogAttributes[key])) {
					// default case for checkboxes
					dogAttributes[key].push(value);
				} else {
					// default case for normal additive attributes
					dogAttributes[key] += value;
				}
			});
		}
	});

	if (isRadio) {
		question.userAnswerRadio = userAnswer;
	} else {
		question.userAnswersCheckbox = userAnswer;
	}
}

// handles all scores
function handleAllScores() {
	quizQuestions.forEach((question) => {
		if (question.userAnswerRadio) {
			handleScore(question.id, question.userAnswerRadio, "radio");
		}
		if (question.userAnswersCheckbox) {
			handleScore(question.id, question.userAnswersCheckbox, "checkbox");
		}
	});
}

// resets previous values
function resetScore() {
	dogAttributes = {
		sociability: 3,
		playfulness: 3,
		energy: 3,
		needsActivity: 3,
		training: 3,
		approachToStrangers: 3,
		controlling: 3,
		barking: 3,
		canBeAlone: 3,
		goodWithKids: 3,
		goodWithPets: 3,
		adaptability: 3,
		stubborn: 3,
		lifeExpectancy: 0,
		availability: 0,
		combing: 0,
		shedding: 0,
		drooling: 0,
		size: [],
		coatLength: [],
	};
}

// checks if user chose an answer and shows alert if needed
function checkAlertResultBtn() {
	let isChecked;
	// for checkbox
	if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
		const checkedCheckboxes = document.querySelectorAll(
			`input[name="checkbox-answer"]:checked`
		);

		if (checkedCheckboxes.length === 0) {
			isChecked = false;
			answersForm.classList.add("check-alert");
			answersForm.classList.add("check-alert--last");
			return;
		} else {
			isChecked = true;
			return isChecked;
		}
	}
	// for radio
	if ("userAnswerRadio" in quizQuestions[currentQuestionIndex]) {
		const checkedRadio = document.querySelector(
			`input[name="radio-answer"]:checked`
		);

		if (checkedRadio === null) {
			isChecked = false;
			answersForm.classList.add("check-alert");
			answersForm.classList.add("check-alert--last");
			return isChecked;
		} else {
			isChecked = true;
			return isChecked;
		}
	}
}

// saves results to sessionStorage
function saveResults() {
	const results = dogAttributes;
	sessionStorage.setItem("quizResults", JSON.stringify(results));
}

// shows user score in console
function showUserScore() {
	console.log("size: " + dogAttributes.size);
	console.log("coatLength: " + dogAttributes.coatLength);

	console.log("sociability: " + dogAttributes.sociability);
	console.log("goodWithKids: " + dogAttributes.goodWithKids);
	console.log("goodWithPets: " + dogAttributes.goodWithPets);
	console.log("approachToStrangers: " + dogAttributes.approachToStrangers);
	console.log("playfulness: " + dogAttributes.playfulness);
	console.log("energy: " + dogAttributes.energy);
	console.log("needsActivity: " + dogAttributes.needsActivity);
	console.log("controlling: " + dogAttributes.controlling);
	console.log("barking: " + dogAttributes.barking);
	console.log("training: " + dogAttributes.training);
	console.log("adaptability: " + dogAttributes.adaptability);
	console.log("canBeAlone: " + dogAttributes.canBeAlone);
	console.log("stubborn: " + dogAttributes.stubborn);

	console.log("shedding: " + dogAttributes.shedding);
	console.log("combing: " + dogAttributes.combing);
	console.log("drooling: " + dogAttributes.drooling);

	console.log("lifeExpectancy: " + dogAttributes.lifeExpectancy);
	console.log("availability: " + dogAttributes.availability);
}

nextQuestionBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		setTimeout(() => {
			nextQuestionOutAnimation();
		}, 300);
		setTimeout(() => {
			nextQuestion();
			nextQuestionInAnimation();
		}, 1000)
	});
});
previousQuestionBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		setTimeout(() => {
			previousQuestionOutAnimation();
		}, 300);
		setTimeout(() => {
			previousQuestion();
			previousQuestionInAnimation();
		}, 1000)
	});
});
btnResults.addEventListener("click", () => {
	resetScore();
	if (checkAlertResultBtn()) {
		saveAnswers();
		handleAllScores();
		saveResults();
	}
});

document.addEventListener("DOMContentLoaded", function () {
	resetScore();
	fetchQuizQuestions();
});
