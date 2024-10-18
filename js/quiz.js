import {quizQuestions} from './quizQuestions.js' 

let currentQuestionIndex = 0;
let barWidth = document.querySelector(".bar-width");
const nextQuestionBtns = document.querySelectorAll(".next-question-icon");
const previousQuestionBtns = document.querySelectorAll(
	".previous-question-icon"
);

// loads quiz question
function loadQuestion(questionIndex) {
	const answersForm = document.querySelector(".answers");
	const currentQuestion = quizQuestions[questionIndex];

	// sets progress bar width
	let width = (currentQuestionIndex + 1) * (100 / quizQuestions.length);
	barWidth.style.width = `${width}%`;

	// removes arrow in first and last questions
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
	} else {
		nextQuestionBtns.forEach((btn) => {
			btn.classList.remove("invisible");
		});
	}

	// updates question number
	document.querySelector(".current-question-number").textContent =
		currentQuestion.id;

	// updates question
	document.querySelector(".current-question-text").textContent =
		currentQuestion.question;

	// deletes previous answers
	answersForm.innerHTML = "";

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
}

// loads next quiz question
function nextQuestion() {
	// checks checkbox answers
	if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
		const checkedCheckboxes = document.querySelectorAll(
			`input[name="checkbox-answer"]:checked`
		);
		const priorityChecked = document.querySelector(
			`input[name="radio-priority"]:checked`
		);

		if (checkedCheckboxes.length === 0) {
			alert("Proszę zaznaczyć odpowiedzi przed pójściem dalej");
			return;
		} else if (priorityChecked === null) {
			alert("Proszę określić wagę pytania przed pójściem dalej");
			return;
		}
	}

	// checks radio answers
	if ("userAnswerRadio" in quizQuestions[currentQuestionIndex]) {
		const checkedRadio = document.querySelector(
			`input[name="radio-answer"]:checked`
		);

		if (checkedRadio === null) {
			alert("Proszę zaznaczyć odpowiedź przed pójściem dalej");
			return;
		}
	}

	// saves answers
	if (currentQuestionIndex >= quizQuestions.length - 1) {
		saveAnswers();
		loadQuestion(currentQuestionIndex);
	} else {
		saveAnswers();
		currentQuestionIndex++;
		loadQuestion(currentQuestionIndex);
	}
}

// loads previous quiz question
function previousQuestion() {
	saveAnswers();
	currentQuestionIndex--;
	if (currentQuestionIndex < 0) {
		currentQuestionIndex++;
	}
	loadQuestion(currentQuestionIndex);
}

// saves answers for current question
function saveAnswers() {
	// saves radio answer to quizQuestions array
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

	// saves checkbox answers to quizQuestions array
	if ("userAnswerRadio" in quizQuestions[currentQuestionIndex]) {
		const radioAnswer = document.querySelector(
			`input[name="radio-answer"]:checked`
		);
		if (radioAnswer !== null) {
			quizQuestions[currentQuestionIndex].userAnswerRadio =
				radioAnswer.nextElementSibling.textContent.trim();
		}
	}

	console.log(quizQuestions[currentQuestionIndex]);
}

nextQuestionBtns.forEach((btn) => {
	btn.addEventListener("click", nextQuestion);
});
previousQuestionBtns.forEach((btn) => {
	btn.addEventListener("click", previousQuestion);
});

document.addEventListener("DOMContentLoaded", function () {
	loadQuestion(currentQuestionIndex);
});
