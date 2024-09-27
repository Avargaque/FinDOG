const quizQuestions = [
	{
		id: 1,
		question: "Jakiego rozmiaru psa preferujesz?",
		answers: ["Mały", "Średni", "Duży"],
		inputType: "checkbox",
		userAnswersCheckbox: [],
		userPriority: "",
	},
	{
		id: 2,
		question:
			"Jaki poziom aktywności psa Ci odpowiada da da da da d a da  da da ?",
		answers: [
			"Niski",
			"Średni",
			"Wysoki WysokiWysokiWy sokiWysokiWys okiWysokiW ysokiWysokiW ysoki",
		],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 3,
		question: "Czy masz inne zwierzęta w domu?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 4,
		question: "Ile czasu dziennie możesz poświęcić na spacery z psem?",
		answers: ["30 minut", "1 godzina", "Więcej niż 1 godzina"],
		inputType: "checkbox",
		userAnswersCheckbox: [],
		userPriority: "",
	},
	{
		id: 5,
		question: "Czy pies będzie przebywał głównie w domu czy na zewnątrz?",
		answers: ["W domu", "Na zewnątrz", "Obie opcje"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 6,
		question: "Jak często planujesz pielęgnować psa?",
		answers: ["Codziennie", "Raz w tygodniu", "Rzadko"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 7,
		question: "Czy masz dzieci w domu?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 8,
		question: "Czy pies powinien być łatwy w tresurze?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 9,
		question: "Czy pies ma być towarzyszem do biegania?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 10,
		question: "Jaka długość sierści psa Ci odpowiada?",
		answers: ["Krótka", "Średnia", "Długa"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 11,
		question: "Czy pies będzie często podróżował samochodem?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 12,
		question: "Czy pies powinien dobrze znosić przebywanie sam w domu?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 13,
		question: "Czy preferujesz psy, które są ciche?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 14,
		question: "Jakie jest Twoje doświadczenie z opieką nad psami?",
		answers: ["Brak", "Średnie", "Duże"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 15,
		question: "Czy pies ma pełnić funkcję stróża?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 16,
		question: "Czy jesteś gotowy na codzienne szkolenie psa?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 17,
		question:
			"Czy wolisz psa bardziej niezależnego czy przywiązanego do właściciela?",
		answers: ["Niezależnego", "Przywiązanego"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 18,
		question: "Czy pies powinien dobrze znosić zimno?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 19,
		question: "Jakie jest Twoje środowisko mieszkaniowe?",
		answers: ["Mieszkanie", "Dom z ogrodem", "Dom bez ogrodu"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
	{
		id: 20,
		question: "Jak bardzo zależy Ci na rasie psa?",
		answers: ["Bardzo", "Nie ma to znaczenia"],
		inputType: "radio",
		userAnswerRadio: "",
		userPriority: "",
	},
];

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

	// resets priority form
	document.querySelector(".priority-form").reset();

	// restores previously selected priority
	const priorityInputs = document.querySelectorAll(`input[name="radio-priority"]`);
	priorityInputs.forEach((input) => {
		if (input.nextElementSibling.textContent.trim() === currentQuestion.userPriority) {
			input.checked = true;
		}
	});
}

// loads next quiz question
function nextQuestion() {
	// checks checkbox answers
    if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
        const checkedCheckboxes = document.querySelectorAll(`input[name="checkbox-answer"]:checked`);
        const priorityChecked = document.querySelector(`input[name="radio-priority"]:checked`);

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
        const checkedRadio = document.querySelector(`input[name="radio-answer"]:checked`);
        const priorityChecked = document.querySelector(`input[name="radio-priority"]:checked`);

        if (checkedRadio === null) {
            alert("Proszę zaznaczyć odpowiedź przed pójściem dalej");
            return;
        } else if (priorityChecked === null) {
            alert("Proszę określić wagę pytania przed pójściem dalej");
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

	// saves radio priority to quizQuestions array
	const radioPriority = document.querySelector(
		`input[name="radio-priority"]:checked`
	);
	if (radioPriority !== null) {
		quizQuestions[currentQuestionIndex].userPriority =
			radioPriority.nextElementSibling.textContent.trim();
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
