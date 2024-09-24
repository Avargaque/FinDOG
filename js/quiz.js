const quizQuestions = [
	{
		id: 1,
		question: "Jakiego rozmiaru psa preferujesz?",
		answers: ["Mały", "Średni", "Duży"],
		inputType: "checkbox",
	},
	{
		id: 2,
		question: "Jaki poziom aktywności psa Ci odpowiada da da da da d a da  da da ?",
		answers: ["Niski", "Średni", "Wysoki WysokiWysokiWy sokiWysokiWys okiWysokiW ysokiWysokiW ysoki"],
		inputType: "radio",
	},
	{
		id: 3,
		question: "Czy masz inne zwierzęta w domu?",
		answers: ["Tak", "Nie"],
		inputType: "radio",
	},
	{
		id: 4,
		question: "Ile czasu dziennie możesz poświęcić na spacery z psem?",
		answers: ["30 minut", "1 godzina", "Więcej niż 1 godzina"],
		inputType: "checkbox",
	},
	{
		id: 5,
		question: "Czy pies będzie przebywał głównie w domu czy na zewnątrz?",
		answers: ["W domu", "Na zewnątrz", "Obie opcje"],
		inputType: "checkbox",
	},
	{
		id: 6,
		question: "Jak często planujesz pielęgnować psa?",
		answers: ["Codziennie", "Raz w tygodniu", "Rzadko"],
		inputType: "checkbox",
	},
	{
		id: 7,
		question: "Czy masz dzieci w domu?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 8,
		question: "Czy pies powinien być łatwy w tresurze?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "checkbox",
	},
	{
		id: 9,
		question: "Czy pies ma być towarzyszem do biegania?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 10,
		question: "Jaka długość sierści psa Ci odpowiada?",
		answers: ["Krótka", "Średnia", "Długa"],
		inputType: "checkbox",
	},
	{
		id: 11,
		question: "Czy pies będzie często podróżował samochodem?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 12,
		question: "Czy pies powinien dobrze znosić przebywanie sam w domu?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 13,
		question: "Czy preferujesz psy, które są ciche?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "checkbox",
	},
	{
		id: 14,
		question: "Jakie jest Twoje doświadczenie z opieką nad psami?",
		answers: ["Brak", "Średnie", "Duże"],
		inputType: "checkbox",
	},
	{
		id: 15,
		question: "Czy pies ma pełnić funkcję stróża?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 16,
		question: "Czy jesteś gotowy na codzienne szkolenie psa?",
		answers: ["Tak", "Nie"],
		inputType: "checkbox",
	},
	{
		id: 17,
		question:
			"Czy wolisz psa bardziej niezależnego czy przywiązanego do właściciela?",
		answers: ["Niezależnego", "Przywiązanego"],
		inputType: "checkbox",
	},
	{
		id: 18,
		question: "Czy pies powinien dobrze znosić zimno?",
		answers: ["Tak", "Nie ma to znaczenia"],
		inputType: "checkbox",
	},
	{
		id: 19,
		question: "Jakie jest Twoje środowisko mieszkaniowe?",
		answers: ["Mieszkanie", "Dom z ogrodem", "Dom bez ogrodu"],
		inputType: "checkbox",
	},
	{
		id: 20,
		question: "Jak bardzo zależy Ci na rasie psa?",
		answers: ["Bardzo", "Nie ma to znaczenia"],
		inputType: "checkbox",
	},
];

let currentQuestionIndex = 0;
let barWidth = document.querySelector('.bar-width')
const nextQuestionBtns = document.querySelectorAll(".next-question-icon");
const previousQuestionBtns = document.querySelectorAll(
	".previous-question-icon"
);

// loads quiz question
function loadQuestion(questionIndex) {
	const answersForm = document.querySelector(".answers");
	const currentQuestion = quizQuestions[questionIndex];

    // sets progress bar width
    let width = (currentQuestionIndex + 1) * (100/quizQuestions.length);
    barWidth.style.width = `${width}%`;
    console.log(barWidth);

    // removes arrow in first and last questions
    if (questionIndex === 0){
        previousQuestionBtns.forEach((btn => {btn.classList.add('invisible')}));
    } else{
        previousQuestionBtns.forEach((btn => {btn.classList.remove('invisible')}));
    }
    if (questionIndex === (quizQuestions.length - 1)){
        nextQuestionBtns.forEach((btn => {btn.classList.add('invisible')}));
    } else{
        nextQuestionBtns.forEach((btn => {btn.classList.remove('invisible')}));
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
			input.name = "radio";
		}

		if (currentQuestion.inputType === "checkbox") {
			input.type = "checkbox";
			input.name = "checkbox";
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
	if (currentQuestionIndex >= (quizQuestions.length - 1)) {
		loadQuestion(currentQuestionIndex);
	} else{
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// loads previous quiz question
function previousQuestion() {
	currentQuestionIndex--;
	if (currentQuestionIndex < 0) {
		currentQuestionIndex++;
	}
	loadQuestion(currentQuestionIndex);
}

nextQuestionBtns.forEach((btn => {btn.addEventListener("click", nextQuestion)}));
previousQuestionBtns.forEach((btn => {btn.addEventListener("click", previousQuestion)}));

document.addEventListener("DOMContentLoaded", function () {
	loadQuestion(currentQuestionIndex);
});
