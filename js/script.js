import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

const animationTime = 0.7;
const animationTimeMs = 700;
// function to set IN animations - do edycji
function gsapInAnimations() {}

// function to set OUT animations - do edycji
function gsapOutAnimations() {}

//////////////////////////////////////////////////////////// VARIABLES

const email = document.querySelector(".email");
const burgerBtn = document.querySelector(".nav__burger-menu");
const filterBtns = document.querySelectorAll(".search-filter");
const filter = document.querySelector(".filter");
const resetFilterBtn = document.querySelector(".reset");
const applyFilterBtn = document.querySelector(".apply");
const searchInput = document.querySelector(".searchbar__input");
const pseudosliders = document.querySelectorAll(".pseudoslider");

let dogData = []; // all dogs from JSON
let selectedFilters = {}; // selected pseudoslider filters
let selectedCheckboxes = {}; // selected checkbox filters
let searchQuery = ""; // text in search container

////////////////////////////////////////////////////////////// FUNCTIONS

// fetches dog breeds
async function fetchDogBreeds() {
	try {
		const response = await fetch("./data/breeds.json");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		dogData = await response.json();

		if (window.location.href.includes("breeds-list.html")) {
			renderDogs(dogData);
		}
	} catch (error) {
		console.error("Error loading dog breeds:", error);
	}
}

// creates HTML code for a single dog in breed list
function createDogForBreedsList(dog) {
	const dogElement = document.createElement("div");
	dogElement.className = "breeds-item";
	dogElement.innerHTML = `
	  <img class="breeds-item__img" src="${dog.photoSmall}" alt="${dog.name}" />
	  <h1 class="breeds-item__name">${dog.name}</h1>
	  <p class="breeds-item__description">${dog.shortAbout}</p>
	`;
	return dogElement;
}

// sorts breeds in alphabetical order
function sortBreedsAlphabetically() {
	const container = document.getElementById("main-breeds-list");
	const items = Array.from(container.querySelectorAll(".breeds-item"));

	items.sort((a, b) => {
		const nameA = a
			.querySelector(".breeds-item__name")
			.textContent.trim()
			.toLowerCase();
		const nameB = b
			.querySelector(".breeds-item__name")
			.textContent.trim()
			.toLowerCase();
		return nameA.localeCompare(nameB);
	});

	container.innerHTML = "";
	items.forEach((item) => container.appendChild(item));
}

// sort breeds by quiz score percantage compatibility
function sortBreedsByCompatibility() {
	const container = document.getElementById("main-breeds-list");
	const dogs = Array.from(container.children);

	dogs.sort((a, b) => {
		const scoreA = a.dataset.score ? parseInt(a.dataset.score) : Infinity;
		const scoreB = b.dataset.score ? parseInt(b.dataset.score) : Infinity;
		return scoreA - scoreB;
	});

	dogs.forEach((dogElement) => container.appendChild(dogElement));
}

// takes user to breed details of the dog he clicked
function goToBreed() {
	const breedsItems = document.querySelectorAll(".breeds-item");

	breedsItems.forEach((item) => {
		item.addEventListener("click", () => {
			handleBreedSelection(item);
		});
		item.addEventListener("mousedown", (event) => {
			// pressing scroll
			if (event.button === 1) {
				handleBreedSelection(item);
			}
		});
	});

	function handleBreedSelection(item) {
		const itemName = item.querySelector(".breeds-item__name").textContent;

		dogData.forEach((dog) => {
			if (dog.name === itemName) {
				let currentDogName = itemName;
				localStorage.setItem("currentDogName", currentDogName);

				// creates proper link
				let breedName = dog.name.toLowerCase().replace(/\s+/g, "-");

				// opens in new window
				window.open(`breed-details.html?breed=${breedName}`, "_blank");
			}
		});
	}
}

// shows breed details by changing breed info and traits
function showBreedDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const breedName = urlParams.get("breed");

	// finds proper breed in dogData
	const breed = dogData.find(
		(dog) => dog.name.toLowerCase().replace(/\s+/g, "-") === breedName
	);
	console.log(dogData);
	if (breed) {
		// basic information
		document.getElementById("breed-name").innerText = breed.name;
		document.getElementById("breed-image").src = breed.photoBig;
		document.getElementById("breed-image").alt = `Zdjęcie ${breed.name}`;
		document.getElementById("breed-about").innerText = breed.longAbout;
		document.getElementById(
			"breed-height"
		).innerText = `Wzrost: ${breed.height}`;
		document.getElementById("breed-weight").innerText = `Waga: ${breed.weight}`;
		document.getElementById(
			"breed-life-expectancy"
		).innerText = `Długość życia: ${breed.lifeExpectancyText}`;
		document.getElementById(
			"breed-fci-group"
		).innerText = `Grupa FCI: ${breed.fciGroup}`;

		// standards
		const plLink = document.getElementById("standard-pl");
		const engLink = document.getElementById("standard-eng");
		plLink.href = breed.standardPl;
		engLink.href = breed.standardEng;
		plLink.innerText = "Standard PL";
		engLink.innerText = "Standard ENG";

		// traits
		updateScore("sociability", breed.sociability);
		updateScore("goodWithKids", breed.goodWithKids);
		updateScore("goodWithPets", breed.goodWithPets);
		updateScore("approachToStrangers", breed.approachToStrangers);
		updateScore("playfulness", breed.playfulness);
		updateScore("energy", breed.energy);
		updateScore("needsActivity", breed.needsActivity);
		updateScore("controlling", breed.controlling);
		updateScore("barking", breed.barking);
		updateScore("training", breed.training);
		updateScore("adaptability", breed.adaptability);
		updateScore("canBeAlone", breed.canBeAlone);
		updateScore("stubborn", breed.stubborn);
		updateScore("shedding", breed.shedding);
		updateScore("combing", breed.combing);
		updateScore("drooling", breed.drooling);
	} else {
		console.error("Breed not found");
	}

	console.log(breed);
}

// updates block scores for breed traits
function updateScore(containerId, value) {
	const scoreBlocks = document.querySelectorAll(`#${containerId} .score-block`);
	scoreBlocks.forEach((block) => block.classList.remove("active"));
	for (let i = 0; i < value; i++) {
		if (scoreBlocks[i]) {
			scoreBlocks[i].classList.add("active");
		}
	}
}

// toggles filter button
function toggleFilter() {
	if (filter.style.opacity === "1") {
		filter.style.pointerEvents = "none";
		filter.style.opacity = "0";
	} else {
		filter.style.pointerEvents = "auto";
		filter.style.opacity = "1";
	}
}

// hides filter after clicking outside of it
function hideFilter(event) {
	if (
		!filter.contains(event.target) &&
		!Array.from(filterBtns).some((btn) => btn.contains(event.target))
	) {
		filter.style.pointerEvents = "none";
		filter.style.opacity = "0";
		document.removeEventListener("click", hideFilter);
	}
}

// puts current year in footer
function footerYear() {
	let currentYear = new Date().getFullYear();
	document.getElementById("currentYear").textContent = currentYear;
}

// copies e-mail address
function copyMailAdress() {
	const textarea = document.createElement("textarea");
	textarea.value = this.textContent;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	// 2sec pop-up
	const popup = document.querySelector(".pop-up-mail");
	popup.classList.add("show");
	setTimeout(() => {
		popup.classList.remove("show");
	}, 2000);
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

// renders dog breeds and shows them in main
function renderDogs(dogs) {
	const container = document.getElementById("main-breeds-list");
	container.innerHTML = "";

	if (dogs.length === 0) {
		container.innerHTML =
			"<p class='breeds-item__description'>Brak wyników dla wybranych filtrów.</p>";
		return;
	}

	// creates HTML element for each dog
	dogs.forEach((dog) => {
		const dogElement = createDogForBreedsList(dog);

		// sets quiz score and breed compatibility for each breed
		if (window.location.href.includes("results.html")) {
			dogElement.dataset.score = dog.score;
			dogElement.dataset.compatibility = dog.compatibility;
			console.log("Breed: " + dog.name + " Score: " + dog.score);
		}

		container.appendChild(dogElement);
	});

	console.log("Rendered dogs:", dogs);

	// sorts results in proper order
	if (window.location.href.includes("breeds-list.html")) {
		sortBreedsAlphabetically();
	} else if (window.location.href.includes("results.html")) {
		sortBreedsByCompatibility();
	}

	goToBreed();
}

// handles filter pseudosliders
function handlePseudosliderChanges() {
	pseudosliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-id");
		let rangeStart = null;
		let rangeEnd = null;

		const values = slider.querySelectorAll(".value");
		const lines = slider.querySelectorAll(".line");

		values.forEach((value) => {
			value.addEventListener("click", () =>
				handleValueClick(value, values, lines, sliderId)
			);
			value.addEventListener("mouseenter", () =>
				handleValueHover(value, values, lines, rangeStart, rangeEnd)
			);
			value.addEventListener("mouseleave", () =>
				updateSelection(values, lines, rangeStart, rangeEnd)
			);
		});

		// handles selecting a value
		function handleValueClick(value, values, lines, sliderId) {
			const clickedValue = parseInt(value.getAttribute("data-value"), 10);

			if (rangeStart === null && rangeEnd === null) {
				rangeStart = clickedValue;
				rangeEnd = clickedValue;
			} else if (rangeStart !== null && rangeEnd !== null) {
				if (clickedValue === rangeStart || clickedValue === rangeEnd) {
					resetRange();
				} else if (clickedValue > rangeStart && clickedValue < rangeEnd) {
					resetRange();
				} else {
					rangeStart = Math.min(clickedValue, rangeStart, rangeEnd);
					rangeEnd = Math.max(clickedValue, rangeStart, rangeEnd);
				}
			} else {
				rangeEnd = clickedValue;
				if (rangeEnd < rangeStart) {
					[rangeStart, rangeEnd] = [rangeEnd, rangeStart];
				}
			}

			updateSelection(values, lines, rangeStart, rangeEnd);

			if (rangeStart !== null && rangeEnd !== null) {
				selectedFilters[sliderId] = { min: rangeStart, max: rangeEnd };
			} else {
				delete selectedFilters[sliderId];
			}

			filterDogs();
		}

		// handles hovering over a value
		function handleValueHover(value, values, lines, rangeStart, rangeEnd) {
			if (rangeStart === null || rangeEnd === null) return;

			// parses hovered element to int
			const valueData = parseInt(value.getAttribute("data-value"), 10);

			// compares hovered element to selected range
			const min = Math.min(rangeStart, rangeEnd, valueData);
			const max = Math.max(rangeStart, rangeEnd, valueData);

			// updates the visuals
			updateSelection(values, lines, min, max);
		}

		// resets range of chosen values
		function resetRange() {
			rangeStart = null;
			rangeEnd = null;
			delete selectedFilters[sliderId];
			updateSelection(values, lines, null, null);
		}
	});
}

// visually updates slider selection
function updateSelection(values, lines, rangeStart, rangeEnd) {
	// removes previous selections
	values.forEach((v) => {
		v.classList.remove("selected");
	});
	lines.forEach((l) => l.classList.remove("selected"));

	// returns if range is not selected
	if (rangeStart === null || rangeEnd === null) return;

	const min = Math.min(rangeStart, rangeEnd);
	const max = Math.max(rangeStart, rangeEnd);

	values.forEach((v) => {
		const val = parseInt(v.getAttribute("data-value"), 10);
		if (val >= min && val <= max) {
			v.classList.add("selected");
		}
	});

	lines.forEach((line, idx) => {
		const lineValue = idx + 1;
		if (lineValue >= min && lineValue < max) {
			line.classList.add("selected");
		}
	});
}

// handles filter checkboxes
function handleCheckboxChanges() {
	const checkboxes = document.querySelectorAll(
		".checkbox-container input[type='checkbox']"
	);

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			const group = checkbox.id.split("-")[0];
			const value = checkbox.id.split("-")[1];

			if (!selectedCheckboxes[group]) {
				selectedCheckboxes[group] = new Set();
			}

			if (checkbox.checked) {
				selectedCheckboxes[group].add(value);
			} else {
				selectedCheckboxes[group].delete(value);
			}

			filterDogs();
		});
	});
}

// changes checkbox filters into dog properties
function mapCheckboxGroupToDogProperty(group, dog) {
	if (group === "size") {
		return dog.size === 1 ? "s" : dog.size === 2 ? "m" : "l";
	} else if (group === "coat") {
		return dog.coatLength === 1 ? "s" : dog.coatLength === 2 ? "m" : "l";
	} else if (group === "availability") {
		return dog.availability === 1 ? "s" : dog.availability === 2 ? "m" : "l";
	}
	return null;
}

// filters dog breeds
function filterDogs() {
	let filteredDogs = dogData;

	// checks search input
	if (searchQuery) {
		filteredDogs = filteredDogs.filter((dog) => {
			return dog.name.toLowerCase().includes(searchQuery.toLowerCase());
		});
	}

	// filters sliders
	for (const [key, range] of Object.entries(selectedFilters)) {
		filteredDogs = filteredDogs.filter((dog) => {
			return dog[key] >= range.min && dog[key] <= range.max;
		});
	}

	// filters checkboxes
	for (const [group, values] of Object.entries(selectedCheckboxes)) {
		if (values.size > 0) {
			filteredDogs = filteredDogs.filter((dog) => {
				const dogValue = mapCheckboxGroupToDogProperty(group, dog);
				return values.has(dogValue);
			});
		}
	}

	// shows all dogs if no filters selected
	if (
		Object.keys(selectedFilters).length === 0 &&
		Object.keys(selectedCheckboxes).length === 0 &&
		!searchQuery
	) {
		filteredDogs = dogData;
	}

	renderDogs(filteredDogs);
}

// resets filters
function resetFilters() {
	// resets sliders
	pseudosliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-id");
		selectedFilters[sliderId] = { min: null, max: null };

		const values = slider.querySelectorAll(".value");
		const lines = slider.querySelectorAll(".line");

		values.forEach((value) => value.classList.remove("selected"));
		lines.forEach((line) => line.classList.remove("selected"));
	});

	// resets checkboxes
	const checkboxes = document.querySelectorAll(
		".checkbox-container input[type='checkbox']"
	);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});

	// resets search input
	if (searchInput) {
		searchInput.value = "";
		searchQuery = "";
	}

	// clears data
	selectedCheckboxes = {};
	selectedFilters = {};

	filterDogs();
	renderDogs(dogData);
}

// shows user score in console
function showUserScore(results) {
	console.log(
		"Wyniki gracza dla każdej cechy (0 oznacza cechy, które nie mają znaczenia dla użytkownika)"
	);
	console.log("size: " + results.size);
	console.log("coatLength: " + results.coatLength);

	console.log("sociability: " + results.sociability);
	console.log("goodWithKids: " + results.goodWithKids);
	console.log("goodWithPets: " + results.goodWithPets);
	console.log("approachToStrangers: " + results.approachToStrangers);
	console.log("playfulness: " + results.playfulness);
	console.log("energy: " + results.energy);
	console.log("needsActivity: " + results.needsActivity);
	console.log("controlling: " + results.controlling);
	console.log("barking: " + results.barking);
	console.log("training: " + results.training);
	console.log("adaptability: " + results.adaptability);
	console.log("canBeAlone: " + results.canBeAlone);
	console.log("stubborn: " + results.stubborn);

	console.log("shedding: " + results.shedding);
	console.log("combing: " + results.combing);
	console.log("drooling: " + results.drooling);

	console.log("lifeExpectancy: " + results.lifeExpectancy);
	console.log("availability: " + results.availability);
}

// checks if user completed quiz to get results
function checkQuiz() {
	// gets results from sessionStorage
	const results = JSON.parse(sessionStorage.getItem("quizResults"));

	// shows results
	if (results) {
		fetchDogBreeds().then(() => {
			compareResultsToBreeds(results);
			checkCompatibility();
			renderDogs(dogData);
			goToBreed();
			setCompatibility();
			showUserScore(results);
		});
	}
	// takes user back to finish quiz
	else {
		window.location.href = "./breed-selector.html";
	}
}

// compares user scores to every breed traits - LOWER SCORE IS MORE COMPATIBLE
function compareResultsToBreeds(results) {
	dogData.forEach((breed) => {
		let score = 0;

		// compares every trait
		for (const key in results) {
			const userValue = results[key];
			const breedValue = breed[key];

			// compares arrays
			if (Array.isArray(userValue)) {
				if (userValue.includes(breedValue)) {
					score += 0; // no penalty for a match
				} else {
					score += 3; // penalty for mismatch
				}
			}
			// if userValue equals 0 it means that trait is indifferent to user
			else if (userValue === 0 || breedValue === undefined) {
				score += 0;
			}
			// compares normal traits
			else {
				score += Math.abs(userValue - breedValue);
			}
		}

		// assigns score to the breed object
		breed.score = score;
	});
}

// checks compatibility
function checkCompatibility() {
	dogData.forEach((breed) => {
		if (breed.score <= 8) {
			breed.compatibility = "idealne dopasowanie";
		} else if (breed.score <= 13) {
			breed.compatibility = "bardzo dobre dopasowanie";
		} else if (breed.score <= 19) {
			breed.compatibility = "dobre dopasowanie";
		} else if (breed.score <= 25) {
			breed.compatibility = "przeciętne dopasowanie";
		} else {
			breed.compatibility = "złe dopasowanie";
		}
	});
}

// set compatibility visual effects
function setCompatibility() {
	const perfectCompatibilityElements = document.querySelectorAll(
		'[data-compatibility="idealne dopasowanie"]'
	);
	const veryGoodCompatibilityElements = document.querySelectorAll(
		'[data-compatibility="bardzo dobre dopasowanie"]'
	);
	const goodCompatibilityElements = document.querySelectorAll(
		'[data-compatibility="dobre dopasowanie"]'
	);
	const averageCompatibilityElements = document.querySelectorAll(
		'[data-compatibility="przeciętne dopasowanie"]'
	);
	const badCompatibilityElements = document.querySelectorAll(
		'[data-compatibility="złe dopasowanie"]'
	);

	// sets visuals depending on compatibility
	perfectCompatibilityElements.forEach((element) => {
		element.classList.add("compatibility", "compatibility--perfect");
	});
	veryGoodCompatibilityElements.forEach((element) => {
		element.classList.add("compatibility", "compatibility--very-good");
	});
	goodCompatibilityElements.forEach((element) => {
		element.classList.add("compatibility", "compatibility--good");
	});
	averageCompatibilityElements.forEach((element) => {
		element.classList.add("compatibility", "compatibility--average");
	});
	badCompatibilityElements.forEach((element) => {
		element.classList.add("compatibility", "compatibility--bad");
	});
}

////////////////////////////////////////////////////////////// EVENT LISTENERS

email.addEventListener("click", copyMailAdress);
burgerBtn.addEventListener("click", toggleBurgerMenu);
screen.orientation.addEventListener("change", resetNavAnimations);
filterBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		toggleFilter();

		// adds event listerner if filter is active
		if (filter.style.opacity === "1") {
			document.addEventListener("click", hideFilter);
		}
	});
});
if (applyFilterBtn) {
	applyFilterBtn.addEventListener("click", toggleFilter);
}
if (resetFilterBtn) {
	resetFilterBtn.addEventListener("click", resetFilters);
}
if (searchInput) {
	searchInput.addEventListener("input", (event) => {
		searchQuery = event.target.value;
		filterDogs();
	});
}

window.addEventListener("load", () => {
	document.body.classList.add("loaded");
});

////////////////////////////////////////////////////////// DOM

document.addEventListener("DOMContentLoaded", function () {
	gsapInAnimations();

	if (window.location.href.includes("breeds-list.html")) {
		fetchDogBreeds().then(() => {
			goToBreed();
		});
	}

	if (window.location.href.includes("results.html")) {
		checkQuiz();
	}

	if (window.location.href.includes("breed-details.html")) {
		fetchDogBreeds().then(() => {
			let currentDogName = localStorage.getItem("currentDogName");
			showBreedDetails();
		});
	}

	handlePseudosliderChanges();
	handleCheckboxChanges();
	footerYear();

	gsapOutAnimations();
});
