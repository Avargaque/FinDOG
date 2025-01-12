import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

const animationTime = 0.7;
const animationTimeMs = 700;
const burgerBtn = document.querySelector(".nav__burger-menu");

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


// function to set IN animations - do edycji
function gsapInAnimations() {}

// function to set OUT animations - do edycji
function gsapOutAnimations() {}




screen.orientation.addEventListener("change", resetNavAnimations);
burgerBtn.addEventListener("click", toggleBurgerMenu);

document.addEventListener("DOMContentLoaded", function () {
	gsapInAnimations();

	gsapOutAnimations();
});
