import { quizQuestions } from "./quiz.js";
import { answersForm } from "./quiz.js";
import { currentQuestionIndex } from "./quiz.js";

const btnResults = document.querySelector(".btn-results");

// parameters on a scale 1-3
// 0 if doesn't matter

let lifeExpectancy = 0; // -11 // 11 - 13 // 13+
let availability = 0;

// parameters on a scale 1-3
// in array because of multiply possible user choices

let size = [];
let coatLength = [];

// parameters on a scale 1-5
// starts in the middle

let sociability = 3;
let goodWithKids = 3;
let goodWithPets = 3;
let approachToStrangers = 3;
let playfulness = 3;
let energy = 3;
let needsActivity = 3;
let controlling = 3;
let barking = 3;
let training = 3;
let adapdability = 3;
let canBeAlone = 3;
let stubborn = 3;

// parameters on a scale 1-5
// 0 if doesn't matter

let shedding = 0;
let combing = 0;
let drooling = 0;

// functions determining user score for every question
function question1() {
	if (quizQuestions[0].userAnswerRadio === quizQuestions[0].answers[0]) {
		sociability += 1;
		playfulness += 1;
	}
	if (quizQuestions[0].userAnswerRadio === quizQuestions[0].answers[1]) {
		sociability += 1;
		goodWithKids += 2;
		playfulness += 1;
		energy += 1;
	}
	if (quizQuestions[0].userAnswerRadio === quizQuestions[0].answers[2]) {
		energy += 2;
		needsActivity += 1;
		training += 1;
	}
	if (quizQuestions[0].userAnswerRadio === quizQuestions[0].answers[3]) {
		approachToStrangers -= 2;
		controlling += 2;
		training += 1;
		barking += 1;
		canBeAlone += 1;
	}
}

function question2() {
	if (quizQuestions[1].userAnswerRadio === quizQuestions[1].answers[0]) {
		sociability += 1;
		needsActivity -= 1;
		adapdability += 2;
		canBeAlone += 1;
		stubborn -= 1;
	}
}

function question3() {
	if (quizQuestions[2].userAnswerRadio === quizQuestions[2].answers[0]) {
		approachToStrangers += 1;
		controlling -= 2;
		barking -= 2;
	}
}

function question4() {
	if (quizQuestions[3].userAnswerRadio === quizQuestions[3].answers[0]) {
		energy -= 1;
		needsActivity -= 1;
	}
	if (quizQuestions[3].userAnswerRadio === quizQuestions[3].answers[2]) {
		energy += 1;
		needsActivity += 1;
	}
}

function question5() {
	if (quizQuestions[4].userAnswerRadio === quizQuestions[4].answers[0]) {
		controlling -= 1;
	}
	if (quizQuestions[4].userAnswerRadio === quizQuestions[4].answers[2]) {
		controlling -= 1;
		approachToStrangers += 2;
	}
}

function question6() {
	if (quizQuestions[5].userAnswerRadio === quizQuestions[5].answers[0]) {
		sociability += 2;
	}
	if (quizQuestions[5].userAnswerRadio === quizQuestions[5].answers[1]) {
		sociability -= 1;
		approachToStrangers += 1;
		barking -= 1;
		canBeAlone += 2;
	}
	if (quizQuestions[5].userAnswerRadio === quizQuestions[5].answers[2]) {
		canBeAlone += 1;
	}
}

function question7() {
	if (quizQuestions[6].userAnswerRadio === quizQuestions[6].answers[1]) {
		sociability += 1;
		adapdability += 2;
		controlling -= 1;
		barking -= 1;
	}
	if (quizQuestions[6].userAnswerRadio === quizQuestions[6].answers[2]) {
		adapdability += 1;
	}
}

function question8() {
	if (quizQuestions[7].userAnswerRadio === quizQuestions[7].answers[0]) {
		sociability += 2;
		goodWithKids += 2;
		playfulness += 2;
		energy += 1;
		stubborn -= 1;
	}
	if (quizQuestions[7].userAnswerRadio === quizQuestions[7].answers[1]) {
		sociability += 1;
		goodWithKids += 1;
		playfulness += 1;
	}
}

function question9() {
	if (quizQuestions[8].userAnswerRadio === quizQuestions[8].answers[0]) {
		energy -= 2;
		needsActivity -= 2;
	}
	if (quizQuestions[8].userAnswerRadio === quizQuestions[8].answers[1]) {
		needsActivity += 1;
	}
	if (quizQuestions[8].userAnswerRadio === quizQuestions[8].answers[2]) {
		needsActivity -= 1;
	}
	if (quizQuestions[8].userAnswerRadio === quizQuestions[8].answers[3]) {
		energy += 2;
		needsActivity += 2;
		approachToStrangers += 1;
		training += 1;
	}
}

function question10() {
	if (quizQuestions[9].userAnswerRadio === quizQuestions[9].answers[0]) {
		sociability += 2;
		canBeAlone -= 1;
		stubborn -= 1;
	}
	if (quizQuestions[9].userAnswerRadio === quizQuestions[9].answers[1]) {
		sociability -= 2;
		canBeAlone += 1;
		stubborn += 1;
		training -= 1;
	}
}

function question11() {
	if (quizQuestions[10].userAnswerRadio === quizQuestions[10].answers[0]) {
		canBeAlone -= 1;
	}
	if (quizQuestions[10].userAnswerRadio === quizQuestions[10].answers[1]) {
		canBeAlone += 1;
	}
	if (quizQuestions[10].userAnswerRadio === quizQuestions[10].answers[2]) {
		canBeAlone += 2;
	}
}

function question12() {
	if (quizQuestions[11].userAnswerRadio === quizQuestions[11].answers[0]) {
		adapdability += 2;
	}
	if (quizQuestions[11].userAnswerRadio === quizQuestions[11].answers[1]) {
		adapdability -= 1;
	}
}

function question13() {
	if (quizQuestions[12].userAnswerRadio === quizQuestions[12].answers[0]) {
		sociability += 1;
		goodWithPets += 2;
	}
	if (quizQuestions[12].userAnswerRadio === quizQuestions[12].answers[1]) {
		goodWithPets -= 1;
	}
}

function question14() {
	if (quizQuestions[13].userAnswerRadio === quizQuestions[13].answers[0]) {
		approachToStrangers += 2;
		controlling -= 1;
	}
	if (quizQuestions[13].userAnswerRadio === quizQuestions[13].answers[1]) {
		approachToStrangers -= 2;
		goodWithPets -= 1;
	}
}

function question15() {
	if (quizQuestions[14].userAnswerRadio === quizQuestions[14].answers[0]) {
		controlling += 2;
		barking += 2;
		goodWithPets -= 1;
		training += 1;
	}
	if (quizQuestions[14].userAnswerRadio === quizQuestions[14].answers[1]) {
		controlling -= 2;
		barking -= 2;
	}
}

function question16() {
	if (quizQuestions[15].userAnswerRadio === quizQuestions[15].answers[0]) {
		barking -= 2;
	}
	if (quizQuestions[15].userAnswerRadio === quizQuestions[15].answers[1]) {
		barking -= 1;
	}
	if (quizQuestions[15].userAnswerRadio === quizQuestions[15].answers[2]) {
		barking += 2;
	}
}

function question17() {
	if (quizQuestions[16].userAnswerRadio === quizQuestions[16].answers[0]) {
		stubborn -= 2;
	}
	if (quizQuestions[16].userAnswerRadio === quizQuestions[16].answers[1]) {
		stubborn -= 1;
	}
}

function question18() {
	if (quizQuestions[17].userAnswerRadio === quizQuestions[17].answers[0]) {
		energy += 2;
	}
	if (quizQuestions[17].userAnswerRadio === quizQuestions[17].answers[1]) {
		energy -= 2;
	}
}

function question19() {
	if (quizQuestions[18].userAnswerRadio === quizQuestions[18].answers[0]) {
		needsActivity += 2;
	}
	if (quizQuestions[18].userAnswerRadio === quizQuestions[18].answers[1]) {
		needsActivity -= 2;
	}
}

function question20() {
	if (quizQuestions[19].userAnswerRadio === quizQuestions[19].answers[0]) {
		playfulness += 2;
	}
	if (quizQuestions[19].userAnswerRadio === quizQuestions[19].answers[1]) {
		playfulness -= 2;
	}
}

function question21() {
	if (quizQuestions[20].userAnswerRadio === quizQuestions[20].answers[0]) {
		training += 2;
	}
	if (quizQuestions[20].userAnswerRadio === quizQuestions[20].answers[1]) {
		training -= 2;
	}
}

function question22() {
	if (quizQuestions[21].userAnswerRadio === quizQuestions[21].answers[0]) {
		lifeExpectancy = 3;
	}
}

function question23() {
	if (quizQuestions[22].userAnswerRadio === quizQuestions[22].answers[0]) {
		combing = 1;
	}
}

function question24() {
	if (quizQuestions[23].userAnswerRadio === quizQuestions[23].answers[0]) {
		shedding = 1;
	}
}

function question25() {
	if (quizQuestions[24].userAnswerRadio === quizQuestions[24].answers[0]) {
		drooling = 1;
	}
}

function question26() {
	if (quizQuestions[25].userAnswerRadio === quizQuestions[25].answers[0]) {
		availability = 3;
	}
}

function question27() {
	if (
		quizQuestions[26].userAnswersCheckbox.includes(quizQuestions[26].answers[0])
	) {
		size.push(1);
	}
	if (
		quizQuestions[26].userAnswersCheckbox.includes(quizQuestions[26].answers[1])
	) {
		size.push(2);
	}
	if (
		quizQuestions[26].userAnswersCheckbox.includes(quizQuestions[26].answers[2])
	) {
		size.push(3);
	}
}

function question28() {
	if (
		quizQuestions[27].userAnswersCheckbox.includes(quizQuestions[27].answers[0])
	) {
		coatLength.push(1);
	}
	if (
		quizQuestions[27].userAnswersCheckbox.includes(quizQuestions[27].answers[1])
	) {
		coatLength.push(2);
	}
	if (
		quizQuestions[27].userAnswersCheckbox.includes(quizQuestions[27].answers[2])
	) {
		coatLength.push(3);
	}
}

// calculates score for every question by activating question functions
function calculateQuestionsScore() {
	question1();
	question2();
	question3();
	question4();
	question5();
	question6();
	question7();
	question8();
	question9();
	question10();
	question11();
	question12();
	question13();
	question14();
	question15();
	question16();
	question17();
	question18();
	question19();
	question20();
	question21();
	question22();
	question23();
	question24();
	question25();
	question26();
	question27();
	question28();
}

// changes points below 0 and above 5
function reduceExcessPoints() {
	if (sociability > 5) {
		sociability = 5;
	}
	if (goodWithKids > 5) {
		goodWithKids = 5;
	}
	if (goodWithPets > 5) {
		goodWithPets = 5;
	}
	if (approachToStrangers > 5) {
		approachToStrangers = 5;
	}
	if (playfulness > 5) {
		playfulness = 5;
	}
	if (energy > 5) {
		energy = 5;
	}
	if (needsActivity > 5) {
		needsActivity = 5;
	}
	if (controlling > 5) {
		controlling = 5;
	}
	if (barking > 5) {
		barking = 5;
	}
	if (training > 5) {
		training = 5;
	}
	if (adapdability > 5) {
		adapdability = 5;
	}
	if (canBeAlone > 5) {
		canBeAlone = 5;
	}
	if (stubborn > 5) {
		stubborn = 5;
	}

	if (sociability < 0) {
		sociability = 0;
	}
	if (goodWithKids < 0) {
		goodWithKids = 0;
	}
	if (goodWithPets < 0) {
		goodWithPets = 0;
	}
	if (approachToStrangers < 0) {
		approachToStrangers = 0;
	}
	if (playfulness < 0) {
		playfulness = 0;
	}
	if (energy < 0) {
		energy = 0;
	}
	if (needsActivity < 0) {
		needsActivity = 0;
	}
	if (controlling < 0) {
		controlling = 0;
	}
	if (barking < 0) {
		barking = 0;
	}
	if (training < 0) {
		training = 0;
	}
	if (adapdability < 0) {
		adapdability = 0;
	}
	if (canBeAlone < 0) {
		canBeAlone = 0;
	}
	if (stubborn < 0) {
		stubborn = 0;
	}
}

// resets previous values
function resetScore() {
	lifeExpectancy = 0;
	availability = 0;

	size = [];
	coatLength = [];

	sociability = 3;
	goodWithKids = 3;
	goodWithPets = 3;
	approachToStrangers = 3;
	playfulness = 3;
	energy = 3;
	needsActivity = 3;
	controlling = 3;
	barking = 3;
	training = 3;
	adapdability = 3;
	canBeAlone = 3;
	stubborn = 3;

	shedding = 0;
	combing = 0;
	drooling = 0;
}

// calculates total user score
function calculateTotalScore() {
	resetScore();
	calculateQuestionsScore();
	reduceExcessPoints();
}

// shows user score in console
function showUserScore() {
	console.log("size: " + size);
	console.log("coatLength: " + coatLength);

	console.log("sociability: " + sociability);
	console.log("goodWithKids: " + goodWithKids);
	console.log("goodWithPets: " + goodWithPets);
	console.log("approachToStrangers: " + approachToStrangers);
	console.log("playfulness: " + playfulness);
	console.log("energy: " + energy);
	console.log("needsActivity: " + needsActivity);
	console.log("controlling: " + controlling);
	console.log("barking: " + barking);
	console.log("training: " + training);
	console.log("adapdability: " + adapdability);
	console.log("canBeAlone: " + canBeAlone);
	console.log("stubborn: " + stubborn);

	console.log("shedding: " + shedding);
	console.log("combing: " + combing);
	console.log("drooling: " + drooling);

	console.log("lifeExpectancy: " + lifeExpectancy);
	console.log("availability: " + availability);
}

// checks user answers and potentailly shows alert for last question
function showAlertResultBtn() {
	// for checkbox
	if ("userAnswersCheckbox" in quizQuestions[currentQuestionIndex]) {
		const checkedCheckboxes = document.querySelectorAll(
			`input[name="checkbox-answer"]:checked`
		);

		if (checkedCheckboxes.length === 0) {
			answersForm.classList.add("check-alert");
			answersForm.classList.add("check-alert--last");
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
			answersForm.classList.add("check-alert--last");
			return;
		}
	}
}

btnResults.addEventListener("click", () => {
	showAlertResultBtn();
	calculateTotalScore();
	showUserScore();
});
