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

////////////////// GSAP

// out of page animation
export function outAnimation() {
	gsap.to("header", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to("main", {
		x: "5vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to("footer", {
		x: "5vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	// Pobierz wszystkie elementy tła
	document.querySelectorAll(".bg-bone").forEach((bone, index) => {
		// Pobranie zapisanej rotacji lub domyślnie 0
		let lastRotation = parseFloat(localStorage.getItem(`boneRotation-${index}`)) || 0;

		// Natychmiastowe ustawienie rotacji PRZED pokazaniem
		bone.style.transform = `rotate(${lastRotation}deg)`;

		// Płynne pokazanie kości po załadowaniu
		gsap.to(bone, {
			opacity: 0,
			duration: 0.8,
			ease: "power1.out",
		});

		// Uruchomienie nieskończonej animacji
		gsap.to(bone, {
			rotation: "+=360",
			duration: 10 + index * 2,
			repeat: -1,
			ease: "linear",
			onUpdate: function () {
				localStorage.setItem(`boneRotation-${index}`, this.targets()[0]._gsap.rotation);
			},
		});
	});
}

// out of home page animation
function outAnimationHome() {
	gsap.to(".main-content.one", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".main-content.two", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to("footer", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	// Pobierz wszystkie elementy tła
	document.querySelectorAll(".bg-bone").forEach((bone, index) => {
		// Pobranie zapisanej rotacji lub domyślnie 0
		let lastRotation = parseFloat(localStorage.getItem(`boneRotation-${index}`)) || 0;

		// Natychmiastowe ustawienie rotacji PRZED pokazaniem
		bone.style.transform = `rotate(${lastRotation}deg)`;

		// Płynne pokazanie kości po załadowaniu
		gsap.to(bone, {
			opacity: 0,
			duration: 0.8,
			ease: "power1.out",
		});

		// Uruchomienie nieskończonej animacji
		gsap.to(bone, {
			rotation: "+=360",
			duration: 10 + index * 2,
			repeat: -1,
			ease: "linear",
			onUpdate: function () {
				localStorage.setItem(`boneRotation-${index}`, this.targets()[0]._gsap.rotation);
			},
		});
	});
}

// breed details out of page animation
function breedDetailsOutAnimation() {
	gsap.to(".breed-image-container", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".breed-info-items", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to(".breed-about", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	gsap.to(".accordion", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.3,
	});
	gsap.to("footer", {
		x: "10vw",
		opacity: 0,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.4,
	});
	// Pobierz wszystkie elementy tła
	document.querySelectorAll(".bg-bone").forEach((bone, index) => {
		// Pobranie zapisanej rotacji lub domyślnie 0
		let lastRotation = parseFloat(localStorage.getItem(`boneRotation-${index}`)) || 0;

		// Natychmiastowe ustawienie rotacji PRZED pokazaniem
		bone.style.transform = `rotate(${lastRotation}deg)`;

		// Płynne pokazanie kości po załadowaniu
		gsap.to(bone, {
			opacity: 0,
			duration: 0.8,
			ease: "power1.out",
		});

		// Uruchomienie nieskończonej animacji
		gsap.to(bone, {
			rotation: "+=360",
			duration: 10 + index * 2,
			repeat: -1,
			ease: "linear",
			onUpdate: function () {
				localStorage.setItem(`boneRotation-${index}`, this.targets()[0]._gsap.rotation);
			},
		});
	});
}

// animations on home page
function homePageAnimations() {
	// in animations
	gsap.to(".main-content.one", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".main-content.two", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1
	});
	gsap.to(".footer", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2
	});

	// out animation
	allBtns.forEach((btn) => {
		btn.addEventListener("click", outAnimationHome);
	});
	navLogo.addEventListener("click", outAnimationHome)
}

// animation on breeds list and results pages
function breedsListPageAnimations() {
	// in animations
	gsap.to(".header-breeds-list", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".main-breeds-list", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to("footer", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
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
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".questions", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to(".answers-arrows-container", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	gsap.to(".next-question-container--desktop", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	gsap.to("footer", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.3,
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
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
	});
	gsap.to(".breed-info-items", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.1,
	});
	gsap.to(".breed-about", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.2,
	});
	gsap.to(".accordion", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.3,
	});
	gsap.to("footer", {
		x: "5vw",
		opacity: 1,
		ease: "power3.out",
		duration: 0.8,
		delay: 0.4,
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
		ease: "power1.in",
		duration: 0.7,
	});
	gsap.to(".main-breed-selector", {
		x: "-100vw",
		ease: "power1.in",
		duration: 0.7,
	});
}
export function nextQuestionInAnimation() {
	gsap.from(".main-breed-selector", {
		x: "100vw",
		ease: "power1.out",
		duration: 0.7,
	});
	gsap.to(".main-breed-selector", {
		x: "0",
		ease: "power1.out",
		duration: 0.7,
	});
}

// previous quiz question animations
export function previousQuestionOutAnimation() {
	gsap.from(".main-breed-selector", {
		x: "0",
		ease: "power1.in",
		duration: 0.7,
	});
	gsap.to(".main-breed-selector", {
		x: "5vw",
		ease: "power1.in",
		duration: 0.7,
	});
}
export function previousQuestionInAnimation() {
	gsap.from(".main-breed-selector", {
		x: "-100vw",
		ease: "power1.out",
		duration: 0.7,
	});
	gsap.to(".main-breed-selector", {
		x: "0",
		ease: "power1.out",
		duration: 0.7,
	});
}

// header animation
function headerAnimation(duration) {
	headers.forEach((header) => {
	  const html = header.innerHTML;
	  header.innerHTML = ""; // czyścimy header
  
	  // Dzielimy zawartość na segmenty: albo cały tekst, albo pełny tag <span>…</span>
	  const segments = html.match(/<span[^>]*>[\s\S]*?<\/span>|[^<]+/g);
	  const timeline = gsap.timeline({ delay: 0.5 });
	  
	  // Dodajemy kursor na końcu
	  const cursor = document.createElement("span");
	  cursor.classList.add("cursor");
	  cursor.textContent = "|";
	  
	  segments.forEach(segment => {
		if (segment.startsWith("<span")) {
		  // Jeśli segment to span, tworzymy nowy span z kopiowanymi atrybutami
		  const temp = document.createElement("div");
		  temp.innerHTML = segment;
		  const origSpan = temp.firstChild;
		  
		  // Tworzymy nowy span (pusty) do animacji
		  const newSpan = document.createElement("span");
		  newSpan.className = origSpan.className; // kopiujemy klasy (ew. inne atrybuty)
		  header.appendChild(newSpan);
		  
		  // Pobieramy tekst do animacji z oryginalnego spana
		  const spanText = origSpan.textContent;
		  let current = "";
		  // Dla spana ustawiamy czas animacji liter jako dwa razy dłuższy
		  spanText.split("").forEach((char) => {
			timeline.to({}, {
			  duration: (duration / html.length) * 2,
			  onComplete: () => {
				current += char;
				newSpan.textContent = current;
			  },
			  ease: "none"
			});
		  });
		} else {
		  // Dla zwykłych fragmentów tekstowych
		  let current = "";
		  const letters = segment.split("");
		  // Tworzymy nowy węzeł tekstowy
		  const textNode = document.createTextNode("");
		  header.appendChild(textNode);
		  letters.forEach((letter) => {
			timeline.to({}, {
			  duration: duration / html.length,
			  onComplete: () => {
				current += letter;
				textNode.textContent = current;
			  },
			  ease: "none"
			});
		  });
		}
	  });
	  
	  header.appendChild(cursor);
	  // Animacja migania kursora
	  gsap.to(cursor, {
		duration: 0.4,
		opacity: 0,
		repeat: -1,
		yoyo: true,
		ease: "none"
	  });
	});
  }  

screen.orientation.addEventListener("change", resetNavAnimations);
burgerBtn.addEventListener("click", toggleBurgerMenu);
navBtns.forEach((btn) => {
	btn.addEventListener("click", handleNavItemsOutAnimation);
});

document.addEventListener("DOMContentLoaded", function () {

	if (document.body.getAttribute("data-page") === "index") {
		homePageAnimations();
		headerAnimation(4);
	}

	if (document.body.getAttribute("data-page") === "breed-selector") {
		quizPageAnimations();
		headerAnimation(0.8);
	}

	if (
		document.body.getAttribute("data-page") === "breeds-list" ||
		document.body.getAttribute("data-page") === "results"
	) {
		breedsListPageAnimations();
		headerAnimation(0.8);
	}

	if (document.body.getAttribute("data-page") === "breed-details") {
		breedsDetailsPageAnimations();
	}

	// Pobierz wszystkie elementy tła
	document.querySelectorAll(".bg-bone").forEach((bone, index) => {
		// Pobranie zapisanej rotacji lub domyślnie 0
		let lastRotation = parseFloat(localStorage.getItem(`boneRotation-${index}`)) || 0;

		// Natychmiastowe ustawienie rotacji PRZED pokazaniem
		bone.style.transform = `rotate(${lastRotation}deg)`;

		// Płynne pokazanie kości po załadowaniu
		gsap.to(bone, {
			opacity: 1,
			duration: 0.8,
			ease: "power1.out",
		});

		// Uruchomienie nieskończonej animacji
		gsap.to(bone, {
			rotation: "+=360",
			duration: 10 + index * 2,
			repeat: -1,
			ease: "linear",
			onUpdate: function () {
				localStorage.setItem(`boneRotation-${index}`, this.targets()[0]._gsap.rotation);
			},
		});
	});
});
