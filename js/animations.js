import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

const burgerBtn = document.querySelector(".nav__burger-menu");
const allBtns = document.querySelectorAll("button");
const navLogo = document.querySelector(".nav__logo");
const navBtns = document.querySelectorAll(".nav__btn");
const searchFilterBtns = document.querySelectorAll('.search-filter');
const headerHome = document.querySelector('.header-home h1')
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
		btn.disabled = true
	})
	setTimeout(() => {
		allBtns.forEach((btn) => {
			btn.disabled = false;
		});
		searchFilterBtns.forEach((btn) => {
			btn.disabled = false
		})
	}, animationTime);
}

// out of page animation
export function outAnimation() {
	gsap.to("header", {
		y: "100vh",
		rotation: -10,
		duration: 0.8,
		ease: "power2.in"
	});
	gsap.to("main", {
		y: "100vh",
		rotation: 15,
		duration: 1,
		ease: "power2.in"
	});
	gsap.to("footer", {
		y: "100vh",
		rotation: -20,
		duration: 1.2,
		ease: "power2.in"
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
	gsap.from(".main__races-img", {
		x: "-150%",
		ease: "power3.out",
		duration: 1,
		delay: 0.33,
	});
	gsap.from(".main__quiz-img", {
		x: "150%",
		ease: "power3.out",
		duration: 1,
		delay: 0.33,
	});
	gsap.from(".main__btn--quiz", {
		x: "100vw",
		ease: "power3.out",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.from(".main__btn--breeds", {
		x: "-100vw",
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
	gsap.from("header", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.from(".main-breeds-list", {
		x: "-100vw",
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
	gsap.from("header", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.from(".questions", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.33,
	});
	gsap.from(".answers-arrows-container", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.from(".next-question-container", {
		x: "-100vw",
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
	gsap.from(".breed-image-container", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
	});
	gsap.from(".breed-info-items", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.33,
	});
	gsap.from(".breed-about", {
		x: "-100vw",
		ease: "back",
		duration: 1.5,
		delay: 0.67,
	});
	gsap.from(".accordion", {
		x: "-100vw",
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
		btn.addEventListener("click", outAnimation)
	});
	navLogo.addEventListener("click", outAnimation)
}

// search filter IN animation
export function filterInAnimation(){
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
export function filterOutAnimation(){
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
export function nextQuestionOutAnimation(){
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
export function nextQuestionInAnimation(){
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
export function previousQuestionOutAnimation(){
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
export function previousQuestionInAnimation(){
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

// home header animation
function homeHeaderAnimation() {
	const text = headerHome.textContent;
	headerHome.textContent = ''; // clears h1
  
	const duration = 3.5;  // total time
	const letterDuration = duration / text.length;
	let timeline = gsap.timeline({ repeat: 0, delay: 1 });
	
	// adds cursor "|"
	const cursor = document.createElement("span");
	cursor.classList.add("cursor");
	cursor.textContent = "|";
	headerHome.appendChild(cursor);
  
	// cursor blink animation
	gsap.to(cursor, {
	  duration: 0.4,
	  opacity: 0,
	  repeat: -1,
	  yoyo: true,
	  ease: "none",
	});
  
	// adds animation for every character
	text.split("").forEach((char, index) => {
	  timeline.to(headerHome, {
		duration: letterDuration,
		onUpdate: () => {
		  if (index < text.length) {
			headerHome.innerHTML = text.slice(0, index + 1);
			headerHome.appendChild(cursor); // adds cursor behind characters
			index++;
		  }
		},
		ease: "none",
	  });
	});
  }

screen.orientation.addEventListener("change", resetNavAnimations);
burgerBtn.addEventListener("click", toggleBurgerMenu);
navBtns.forEach((btn) => {
	btn.addEventListener("click", handleNavItemsOutAnimation)
});

document.addEventListener("DOMContentLoaded", function () {
	disableButtonsDuringAnimation();

	if (document.body.getAttribute("data-page") === "index") {
		homePageAnimations();
		homeHeaderAnimation();
	}

	if (document.body.getAttribute("data-page") === "breed-selector") {
		quizPageAnimations();
	}

	if (
		document.body.getAttribute("data-page") === "breeds-list" ||
		document.body.getAttribute("data-page") === "results"
	) {
		breedsListPageAnimations();
	}

	if (document.body.getAttribute("data-page") === "breed-details") {
		breedsDetailsPageAnimations();
	}
});
