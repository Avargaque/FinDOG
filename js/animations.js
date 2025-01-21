import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

const burgerBtn = document.querySelector(".nav__burger-menu");
const allBtns = document.querySelectorAll("button");
const navLogo = document.querySelector(".nav__logo");
const navBtns = document.querySelectorAll(".nav__btn");
const searchFilterBtns = document.querySelectorAll(".search-filter");
const headers = document.querySelectorAll("header h1");
// adds navItemsIn animation
function handleNavItemsInAnimation() {
	const btns = document.querySelectorAll(".nav__btn");
	let delayTime = 0;
	btns.forEach((item) => {
		item.classList.add("nav-items-in");
		item.classList.remove("nav-items-out");
		item.style.animationDelay = "." + delayTime + "s";
		delayTime++;
	});
}

// adds navItemsOut animation
function handleNavItemsOutAnimation() {
	const btns = document.querySelectorAll(".nav__btn");
	let delayTime = 0;
	btns.forEach((item) => {
		item.classList.add("nav-items-out");
		item.classList.remove("nav-items-in");
		item.style.animationDelay = "." + delayTime + "s";
		delayTime++;
	});
}

// resets animations after changing screen orientation
function resetNavAnimations() {
	const btns = document.querySelectorAll(".nav__btn");
	let delayTime = 0;
	btns.forEach((item) => {
		burgerBtn.classList.add("nav__burger-menu--inactive");
		item.classList.remove("nav-items-out");
		item.classList.remove("nav-items-in");
		item.style.animationDelay = "." + delayTime + "s";
		delayTime++;
	});
}

// toggles burger menu
function toggleBurgerMenu() {
	burgerBtn.classList.toggle("nav__burger-menu--inactive");

	if (burgerBtn.classList.contains("nav__burger-menu--inactive")) {
		handleNavItemsOutAnimation();
	} else {
		handleNavItemsInAnimation();
	}

	disableBurgerMenu();
}

// disables burger menu for 1 second
function disableBurgerMenu() {
	burgerBtn.style.pointerEvents = "none";
	setTimeout(() => {
		burgerBtn.style.pointerEvents = "auto";
	}, 1000);
}

// disables buttons during animations
function disableButtonsDuringAnimation(animationTime = 2000) {
	allBtns.forEach((btn) => {
		btn.disabled = true;
	});
	searchFilterBtns.forEach((btn) => {
		btn.disabled = true;
	});
	setTimeout(() => {
		allBtns.forEach((btn) => {
			btn.disabled = false;
		});
		searchFilterBtns.forEach((btn) => {
			btn.disabled = false;
		});
	}, animationTime);
}

// out of page animation
export function outAnimation() {
	gsap.to("header", {
		y: "100vh",
		rotation: -10,
		duration: 0.8,
		ease: "power2.in",
	});
	gsap.to("main", {
		y: "100vh",
		rotation: 15,
		duration: 1,
		ease: "power2.in",
	});
	gsap.to("footer", {
		y: "100vh",
		rotation: -20,
		duration: 1.2,
		ease: "power2.in",
	});
}

// breed details out of page animation
function breedDetailsOutAnimation() {
	gsap.to(".breed-image-container", {
		y: "100vh",
		rotation: -10,
		duration: 0.6,
		ease: "power2.in",
	});
	gsap.to(".breed-info-items", {
		y: "100vh",
		rotation: 15,
		duration: 0.8,
		ease: "power2.in",
	});
	gsap.to(".breed-about", {
		y: "100vh",
		rotation: -20,
		duration: 1,
		ease: "power2.in",
	});
	gsap.to(".accordion", {
		y: "100vh",
		rotation: 10,
		duration: 1.2,
		ease: "power2.in",
	});
	gsap.to("footer", {
		y: "100vh",
		rotation: -15,
		duration: 1.4,
		ease: "power2.in",
	});
}

// animations on home page
function homePageAnimations() {
	// in animations
	// let headerTimeline = gsap.timeline({

	// })
	gsap.from(".nav", {
		x: "-100%",
		ease: "power1.out",
		duration: 1,
	});
	gsap.to(".header-home", {
		x: "100vw",
		ease: "power3.out",
		duration: 1,
	});
	gsap.to(".main__races-img", {
		x: "100vw",
		ease: "power3.out",
		duration: 1,
		delay: 0.33,
	});
	gsap.to(".main__quiz-img", {
		x: "-100vw",
		ease: "power3.out",
		duration: 1,
		delay: 0.33,
	});
	gsap.to(".main__btn--quiz", {
		x: "-100vw",
		ease: "power3.out",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.to(".main__btn--breeds", {
		x: "100vw",
		ease: "power3.out",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.from(".footer", {
		x: "100%",
		ease: "power1.out",
		duration: 1,
	});

	// out animation
	allBtns.forEach((btn) => {
		btn.addEventListener("click", outAnimation);
	});
}

// animation on breeds list and results pages
function breedsListPageAnimations() {
	// in animations
	gsap.to("header", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.to(".main-breeds-list", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.5,
	});
	gsap.from("footer", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 1,
	});

	// out animation
	allBtns.forEach((btn) => {
		btn.addEventListener("click", outAnimation);
	});

	// disables animation on filter buttons
	const applyBtn = document.querySelector(".apply");
	const resetBtn = document.querySelector(".reset");
	applyBtn.removeEventListener("click", outAnimation);
	resetBtn.removeEventListener("click", outAnimation);
	navLogo.addEventListener("click", outAnimation);
}

// animation on quiz page
function quizPageAnimations() {
	// in animations
	gsap.to("header", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.to(".questions", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.33,
	});
	gsap.to(".answers-arrows-container", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.to(".next-question-container", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.from("footer", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 1,
	});

	// out animation
	allBtns.forEach((btn) => {
		btn.addEventListener("click", outAnimation);
	});
	navLogo.addEventListener("click", outAnimation);
}

// animation on breed details page
function breedsDetailsPageAnimations() {
	// in animations
	gsap.to(".breed-image-container", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.to(".breed-info-items", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.33,
	});
	gsap.to(".breed-about", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.to(".accordion", {
		x: "100vw",
		ease: "back",
		duration: 1.5,
		delay: 1,
	});
	gsap.from("footer", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 1.5,
	});

	// out animation
	allBtns.forEach((btn) => {
		btn.addEventListener("click", breedDetailsOutAnimation);
	});
	const accordionBtns = document.querySelectorAll('.accordion-button')
	accordionBtns.forEach((btn) => {
		btn.removeEventListener("click", breedDetailsOutAnimation);
	});
	navLogo.addEventListener("click", breedDetailsOutAnimation);
}

// search filter IN animation
export function filterInAnimation() {
	gsap.from(".filter", {
		y: "-110%",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".filter", {
		y: "0",
		ease: "power2.out",
		duration: 1,
	});
}

// search filter OUT animation
export function filterOutAnimation() {
	gsap.from(".filter", {
		y: "0",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".filter", {
		y: "-110%",
		ease: "power2.out",
		duration: 1,
	});
}

// next quiz question animations
export function nextQuestionOutAnimation() {
	gsap.from(".main-breed-selector", {
		x: "0",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".main-breed-selector", {
		x: "100vw",
		ease: "power2.out",
		duration: 1,
	});
}
export function nextQuestionInAnimation() {
	gsap.from(".main-breed-selector", {
		x: "-100vw",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".main-breed-selector", {
		x: "0",
		ease: "power2.out",
		duration: 1,
	});
}

// previous quiz question animations
export function previousQuestionOutAnimation() {
	gsap.from(".main-breed-selector", {
		x: "0",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".main-breed-selector", {
		x: "-100vw",
		ease: "power2.out",
		duration: 1,
	});
}
export function previousQuestionInAnimation() {
	gsap.from(".main-breed-selector", {
		x: "100vw",
		ease: "power2.out",
		duration: 1,
	});
	gsap.to(".main-breed-selector", {
		x: "0",
		ease: "power2.out",
		duration: 1,
	});
}

// header animation
function headerAnimation(duration) {
	headers.forEach((header) => {
		const text = header.textContent;
		header.textContent = ""; // clears header

		const letterDuration = duration / text.length;
		let timeline = gsap.timeline({ repeat: 0, delay: 1 });

		// adds cursor "|"
		const cursor = document.createElement("span");
		cursor.classList.add("cursor");
		cursor.textContent = "|";
		header.appendChild(cursor);

		// cursor blink animation
		gsap.to(cursor, {
			duration: 0.4,
			opacity: 0,
			repeat: -1,
			yoyo: true,
			ease: "none",
		});

		let index = 0;

		// adds animation for every character
		text.split("").forEach((char, i) => {
			timeline.to(header, {
				duration: letterDuration,
				onUpdate: () => {
					if (index <= i) {
						header.innerHTML = text.slice(0, index + 1);
						header.appendChild(cursor); // Add cursor after the characters
						index++;
					}
				},
				ease: "none",
			});
		});
	});
}

screen.orientation.addEventListener("change", resetNavAnimations);
burgerBtn.addEventListener("click", toggleBurgerMenu);
navBtns.forEach((btn) => {
	btn.addEventListener("click", handleNavItemsOutAnimation);
});

document.addEventListener("DOMContentLoaded", function () {
	disableButtonsDuringAnimation();

	if (document.body.getAttribute("data-page") === "index") {
		homePageAnimations();
		headerAnimation(3.5);
	}

	if (document.body.getAttribute("data-page") === "breed-selector") {
		quizPageAnimations();
		headerAnimation(1);
	}

	if (
		document.body.getAttribute("data-page") === "breeds-list" ||
		document.body.getAttribute("data-page") === "results"
	) {
		breedsListPageAnimations();
		headerAnimation(1);
	}

	if (document.body.getAttribute("data-page") === "breed-details") {
		breedsDetailsPageAnimations();
	}
});
