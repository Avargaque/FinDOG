import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

const animationTime = 0.7;
const animationTimeMs = 700;
// function to set OUT animations
function gsapInAnimations() {}

// function to set IN animations
function gsapOutAnimations() {}

//////////////////////////////////////////////////////////// VARIABLES

const email = document.querySelector(".email");
const burgerBtn = document.querySelector(".nav__burger-menu");
const navBtns = document.querySelector(".nav__buttons");
const filterBtns = document.querySelectorAll(".search-filter");
const filter = document.querySelector(".filter");
const resetFilterBtn = document.querySelector(".reset");
const applyFilterBtn = document.querySelector(".apply");
const searchInput = document.querySelector(".searchbar__input");
const pseudosliders = document.querySelectorAll(".pseudoslider");

let dogData = []; // all dogs from JSON
let selectedFilters = {}; // selected pseudoslider filters
let selectedCheckboxes = {}; // selected checkbox filters

////////////////////////////////////////////////////////////// FUNCTIONS

// fetches dog breeds
async function fetchDogBreeds() {
	try {
		const response = await fetch("../data/breeds.json");
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

// takes user to breed details
function goToBreed() {
	const breedsItems = document.querySelectorAll(".breeds-item");
	breedsItems.forEach((item) => {
		item.addEventListener("click", () => {
			const itemName = item.querySelector(".breeds-item__name").textContent;

			dogData.forEach((dog) => {
				if (dog.name === itemName) {
					let currentDogName = itemName;
					localStorage.setItem("currentDogName", currentDogName)
					window.location.href = "/breed-details.html";
				}
			});
		});
	});
}

function showBreedDetails(breedName) {
	const breed = dogData.find((dog) => dog.name === breedName);
	console.log(dogData);
	if (breed) {
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

		const plLink = document.getElementById("standard-pl");
		const engLink = document.getElementById("standard-eng");
		plLink.href = breed.standardPl;
		engLink.href = breed.standardEng;
		plLink.innerText = "Standard PL";
		engLink.innerText = "Standard ENG";

		const characteristics = document.getElementById("breed-characteristics");
		Object.entries({
			Wielkość: breed.size,
			"Długość sierści": breed.coatLength,
			"Długość życia": breed.lifeExpectancy,
			Dostępność: breed.availability,
			Towarzyskość: breed.sociability,
			"Dobry z dziećmi": breed.goodWithKids,
			"Dobry z innymi zwierzętami": breed.goodWithPets,
			"Podejście do obcych": breed.approachToStrangers,
			Zabawy: breed.playfulness,
			"Poziom energii": breed.energy,
			"Potrzeby aktywności": breed.needsActivity,
			Kontrola: breed.controlling,
			Hałasowanie: breed.barking,
			Szkolenie: breed.training,
			Adaptacja: breed.adaptability,
			Samodzielność: breed.canBeAlone,
			Upartość: breed.stubborn,
			Linienie: breed.shedding,
			Czesanie: breed.combing,
			"Ślinienie się": breed.drooling,
		}).forEach(([key, value]) => {
			const li = document.createElement("li");
			li.innerText = `${key}: ${value}`;
			characteristics.appendChild(li);
		});
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
		container.appendChild(dogElement);
	});

	console.log("Rendered dogs:", dogs);

	sortBreedsAlphabetically();
}

// filters dogs in searchbar
function filterDogSearch(query) {
	let filteredDogs = dogData.filter((dog) => {
		return dog.name.toLowerCase().includes(query);
	});

	renderDogs(filteredDogs);
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
		Object.keys(selectedCheckboxes).length === 0
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

	// clears data
	selectedCheckboxes = {};
	selectedFilters = {};

	filterDogs();
	renderDogs(dogData);
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
	searchInput.addEventListener("input", () => {
		const query = this.value.toLowerCase();
		filterDogSearch(query);
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
	if (window.location.href.includes("breed-details.html")) {
		fetchDogBreeds().then(() => {
			let currentDogName = localStorage.getItem("currentDogName")
			showBreedDetails(currentDogName)
		});
	}

	handlePseudosliderChanges();
	handleCheckboxChanges();
	footerYear();

	gsapOutAnimations();
});
