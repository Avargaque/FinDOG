import { outAnimation } from "./animations.js";
import { filterOutAnimation } from "./animations.js";
import { filterInAnimation } from "./animations.js";

//////////////////////////////////////////////////////////// VARIABLES

const email = document.querySelector(".email");

const filterBtns = document.querySelectorAll(".search-filter");
const filter = document.querySelector(".filter");
const resetFilterBtn = document.querySelector(".reset");
const applyFilterBtn = document.querySelector(".apply");
const searchInput = document.querySelector(".searchbar__input");
const pseudosliders = document.querySelectorAll(".pseudoslider");
const groupBtns = document.querySelectorAll(".group");

const mainQuizBtns = document.querySelectorAll(".main-btn--quiz");
const mainBreedsBtns = document.querySelectorAll(".main-btn--breeds");
const resultsBtn = document.querySelector(".btn-results");
const navListBtn = document.querySelector(".nav__btn-list");
const navQuizBtn = document.querySelector(".nav__btn-quiz");
const navResultsBtn = document.querySelector(".nav__btn-results");
const navLogo = document.querySelector(".nav__logo");

let dogData = []; // all dogs from JSON
let selectedFilters = {}; // selected pseudoslider filters
let selectedCheckboxes = {}; // selected checkbox filters
let selectedGroups = []; // selected FCI groups filters
let searchQuery = ""; // text in search container
const animationTime = 800; // out animation time in ms

////////////////////////////////////////////////////////////// FUNCTIONS

//////////////// universal functions

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

//////////////// breeds list functions

// fetches dog breeds
async function fetchDogBreeds() {
	try {
		const response = await fetch("./data/breeds.json");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		dogData = await response.json();

		if (document.body.getAttribute("data-page") === "breeds-list") {
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
		if (document.body.getAttribute("data-page") === "results") {
			dogElement.dataset.score = dog.score;
			dogElement.dataset.compatibility = dog.compatibility;
			console.log("Breed: " + dog.name + " Score: " + dog.score);
		}

		container.appendChild(dogElement);
	});

	console.log("Rendered dogs:", dogs);

	// sorts results in proper order
	if (document.body.getAttribute("data-page") === "breeds-list") {
		sortBreedsAlphabetically();
	} else if (document.body.getAttribute("data-page") === "results") {
		sortBreedsByCompatibility();
	}

	goToBreed();
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

// takes user to breed details of the dog he clicked
function goToBreed() {
	const breedsItems = document.querySelectorAll(".breeds-item");

	breedsItems.forEach((item) => {
		item.addEventListener("click", () => {
			handleBreedSelection(item, false);
		});
		item.addEventListener("mousedown", (event) => {
			// pressing scroll
			if (event.button === 1) {
				handleBreedSelection(item, true);
			}
		});
	});

	function handleBreedSelection(item, isMouseDown) {
		const itemName = item.querySelector(".breeds-item__name").textContent;

		dogData.forEach((dog) => {
			if (dog.name === itemName) {
				let currentDogName = itemName;
				localStorage.setItem("currentDogName", currentDogName);

				// creates proper link
				let breedName = dog.name.toLowerCase().replace(/\s+/g, "-");

				// opens in the same window
				if (!isMouseDown) {
					document.body.classList.remove("loaded");
					setTimeout(() => {
						(window.location.href = `breed-details.html?breed=${breedName}`),
							"_blank";
						// resets filters
						resetFilters();
					}, animationTime);
				}

				// opens in new window
				if (isMouseDown) {
					window.open(`breed-details.html?breed=${breedName}`, "_blank");
				}
			}
		});
	}
}

/////////////// breeds details functions

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
		document.getElementById("breed-about").innerHTML = breed.longAbout;
		document.getElementById(
			"breed-height"
		).innerHTML = `Wzrost: <b>${breed.height}`;
		document.getElementById(
			"breed-weight"
		).innerHTML = `Waga: <b>${breed.weight}`;
		document.getElementById(
			"breed-life-expectancy"
		).innerHTML = `Długość życia: <b>${breed.lifeExpectancyText}`;
		document.getElementById(
			"breed-fci-group"
		).innerHTML = `Grupa FCI: <b>${breed.fciGroup}`;

		// availability
		if (breed.availability === 1) {
			document.getElementById(
				"breed-availability"
			).innerHTML = `Dostępność rasy w Polsce: <b>niska lub zerowa <i class="fa-solid fa-arrow-trend-down"></i>`;
		} else if (breed.availability === 2) {
			document.getElementById(
				"breed-availability"
			).innerHTML = `Dostępność rasy w Polsce: <b>umiarkowana <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-tilde"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12c0 -1.657 1.592 -3 3.556 -3c1.963 0 3.11 1.5 4.444 3c1.333 1.5 2.48 3 4.444 3s3.556 -1.343 3.556 -3" /></svg>`;
		} else if (breed.availability === 3) {
			document.getElementById(
				"breed-availability"
			).innerHTML = `Dostępność rasy w Polsce: <b>powszechna <i class="fa-solid fa-arrow-trend-up"></i>`;
		}

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

/////////////// filter functions

// toggles filter button
function toggleFilter() {
	if (filter.style.opacity === "1") {
		filterBtns.forEach((btn) => {
			btn.removeEventListener("click", toggleFilter);
		});
		document.removeEventListener("click", hideFilter);
		filterOutAnimation();
		filter.style.pointerEvents = "none";
		setTimeout(() => {
			filter.style.opacity = "0";
			filterBtns.forEach((btn) => {
				btn.addEventListener("click", toggleFilter);
			});
		}, animationTime + 200);
	} else {
		filterBtns.forEach((btn) => {
			btn.removeEventListener("click", toggleFilter);
		});
		filterInAnimation();
		filter.style.opacity = "1";
		filter.style.pointerEvents = "auto";
		setTimeout(() => {
			document.addEventListener("click", hideFilter);
			filterBtns.forEach((btn) => {
				btn.addEventListener("click", toggleFilter);
			});
		}, animationTime + 200);
	}
}

// hides filter after clicking outside of it
function hideFilter(event) {
	if (
		!filter.contains(event.target) &&
		!Array.from(filterBtns).some((btn) => btn.contains(event.target))
	) {
		toggleFilter();
		document.removeEventListener("click", hideFilter);
	}
}

// handles filter pseudosliders
function handlePseudosliderChanges() {
	pseudosliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-id");
		const values = slider.querySelectorAll(".value");

		// keeps track of the selected range for this slider
		const rangeState = { start: null, end: null };

		// event listeners
		addPseudosliderEventListeners(values, sliderId, rangeState);
	});
}

// adds pseudofilters event listeners
function addPseudosliderEventListeners(values, sliderId, rangeState) {
	values.forEach((value) => {
		value.addEventListener("click", () =>
			handleValueClick(value, values, sliderId, rangeState)
		);
		value.addEventListener("mouseenter", () =>
			handleValueHover(value, values, rangeState)
		);
		value.addEventListener("mouseleave", () =>
			updateSelection(values, rangeState.start, rangeState.end)
		);
	});
}

// handles selecting a value
function handleValueClick(value, values, sliderId, rangeState) {
	const clickedValue = parseInt(value.getAttribute("data-value"), 10);

	// 0 chosen values - adds 1 filter/starts range
	if (rangeState.start === null && rangeState.end === null) {
		rangeState.start = clickedValue;
		rangeState.end = clickedValue;
	}
	// 2 chosen values
	else if (rangeState.start !== null && rangeState.end !== null) {
		// cancels filter
		if (
			clickedValue === rangeState.start ||
			clickedValue === rangeState.end ||
			(clickedValue > rangeState.start && clickedValue < rangeState.end)
		) {
			resetRange(values, sliderId, rangeState);
		}
		// adds wider range
		else {
			rangeState.start = Math.min(
				clickedValue,
				rangeState.start,
				rangeState.end
			);
			rangeState.end = Math.max(clickedValue, rangeState.start, rangeState.end);
		}
	}
	// 1 chosen value - selects range
	else {
		rangeState.end = clickedValue;
		if (rangeState.end < rangeState.start) {
			[rangeState.start, rangeState.end] = [rangeState.end, rangeState.start];
		}
	}

	updateSelection(values, rangeState.start, rangeState.end);

	// activates or disactivates filters
	if (rangeState.start !== null && rangeState.end !== null) {
		selectedFilters[sliderId] = { min: rangeState.start, max: rangeState.end };
	} else {
		delete selectedFilters[sliderId];
	}

	filterDogs();
}

// handles hovering over a value
function handleValueHover(value, values, rangeState) {
	// returns if there is no range selected
	if (rangeState.start === null || rangeState.end === null) {
		updateSelection(values, null, null);
		return;
	}

	// parses hovered element to int
	const hoveredValue = parseInt(value.getAttribute("data-value"), 10);

	// compares hovered element to selected range
	const min = Math.min(rangeState.start, rangeState.end, hoveredValue);
	const max = Math.max(rangeState.start, rangeState.end, hoveredValue);

	// updates the visuals
	updateSelection(values, min, max);
}

// resets range of chosen values
function resetRange(values, sliderId, rangeState) {
	rangeState.start = null;
	rangeState.end = null;
	delete selectedFilters[sliderId];
	updateSelection(values, null, null);
}

// visually updates slider selection
function updateSelection(values, rangeStart, rangeEnd) {
	// removes previous selections
	values.forEach((v) => {
		v.classList.remove("selected");
	});

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
}

// resets all filters
function resetFilters() {
	// resets sliders
	pseudosliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-id");
		const values = slider.querySelectorAll(".value");
		const rangeState = { start: null, end: null };

		delete selectedFilters[sliderId];
		updateSelection(values, null, null);
		addPseudosliderEventListeners(values, sliderId, rangeState);
	});

	// resets checkboxes
	const checkboxes = document.querySelectorAll(
		".checkbox-container input[type='checkbox']"
	);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});

	// resets groups
	groupBtns.forEach((btn) => {
		btn.classList.remove("active");
	});

	// resets search input
	if (searchInput) {
		searchInput.value = "";
		searchQuery = "";
	}

	// clears data
	selectedCheckboxes = {};
	selectedFilters = {};
	selectedGroups = [];

	filterDogs();
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

// handles single group filter changes
function handleSingleGroupChanges(btn) {
	btn.classList.toggle("active");
	selectedGroups = [...document.querySelectorAll(".group.active")].map((el) =>
		el.id.replace("group-", "")
	);

	filterDogs();
}

// handles all groups filters changes
function handleAllGroupChanges(){
	groupBtns.forEach((btn) => {
		btn.addEventListener("change", () => {
			filterDogs();
		})
	})	
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

	// filters groups
	if (selectedGroups.length > 0) {
		filteredDogs = filteredDogs.filter((dog) => {
			return selectedGroups.includes(dog.fciGroup);
		});
	}

	// shows all dogs if no filters selected
	if (
		Object.keys(selectedFilters).length === 0 &&
		Object.keys(selectedCheckboxes).length === 0 &&
		selectedGroups.length === 0 &&
		!searchQuery
	) {
		filteredDogs = dogData;
	}

	// shows user score for results
	if (document.body.getAttribute("data-page") === "results") {
		const results = JSON.parse(localStorage.getItem("quizResults"));
		compareResultsToBreeds(results);
		checkCompatibility();
		renderDogs(filteredDogs);
		goToBreed();
		setScore();
		setCompatibility();
	} else {
		renderDogs(filteredDogs);
	}

	// reassigns out animation
	const breedsItems = document.querySelectorAll(".breeds-item");
	breedsItems.forEach((breedBtn) => {
		breedBtn.addEventListener("click", () => {
			outAnimation();
		});
	});
}

//////////////// score functions

// shows user score in console
function showUserScore(results) {
	console.log(
		"Wyniki gracza dla każdej cechy w skali 1-5 (0 oznacza cechy, które nie mają znaczenia dla użytkownika)"
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
	// gets results from localStorage
	const results = JSON.parse(localStorage.getItem("quizResults"));

	// shows results
	if (results) {
		fetchDogBreeds().then(() => {
			compareResultsToBreeds(results);
			checkCompatibility();
			renderDogs(dogData);
			goToBreed();
			setScore();
			setCompatibility();
			showUserScore(results);
		});
	}
	// takes user back to finish quiz
	else {
		window.location.href = "./breed-selector.html";
	}
}

// compares user scores to every breed traits
function compareResultsToBreeds(results) {
	const groupOne = [
		"sociability",
		"goodWithKids",
		"goodWithPets",
		"approachToStrangers",
		"controlling",
		"canBeAlone",
		"adaptability",
		"playfulness",
		"energy",
		"needsActivity",
		"training",
		"stubborn",
	];
	const groupTwo = ["lifeExpectancy", "availability"];
	const groupThree = ["barking", "combing", "shedding", "drooling"];

	dogData.forEach((breed) => {
		let score = 0;
		let scoreMax = 0;

		// compares every trait
		for (const key in results) {
			const userValue = results[key];
			const breedValue = breed[key];

			// compares arrays from checkboxes (size, coatLength)
			if (Array.isArray(userValue)) {
				if (userValue.includes(breedValue)) {
					score += 4; // match
					scoreMax += 4;
				} else {
					score += 0; // mismatch
					scoreMax += 4;
				}
			}

			// compares groupOne traits
			else if (userValue !== 0 && groupOne.includes(key)) {
				score += 4 - Math.abs(userValue - breedValue); // difference
				scoreMax += 4; // maximal difference between user and breed values
			} else if (userValue === 0 && groupOne.includes(key)) {
				score += 0;
				scoreMax += 0;
			}

			// compares groupTwo traits
			else if (userValue !== 0 && groupTwo.includes(key)) {
				score += (2 - Math.abs(userValue - breedValue)) * 2; // difference between user and breed values
				scoreMax += 4; // maximal difference between user and breed values
			} else if (userValue === 0 && groupTwo.includes(key)) {
				score += 4;
				scoreMax += 4;
			}

			// compares groupThree traits
			else if (userValue !== 0 && groupThree.includes(key)) {
				score += 4 - Math.abs(userValue - breedValue); // difference between user and breed values
				scoreMax += 4; // maximal difference between user and breed values
			} else if (userValue === 0 && groupThree.includes(key)) {
				score += 4;
				scoreMax += 4;
			} else {
				console.error("Error calculating score for key:", key);
			}
		}
		console.log(scoreMax);

		// assigns score to the breed object (in % compatibility)
		breed.score = ((score * 100) / scoreMax).toFixed(0);
	});
}

// checks score compatibility for dog breeds
function checkCompatibility() {
	dogData.forEach((breed) => {
		if (breed.score >= 85) {
			breed.compatibility = "idealne dopasowanie";
		} else if (breed.score >= 75) {
			breed.compatibility = "bardzo dobre dopasowanie";
		} else if (breed.score >= 65) {
			breed.compatibility = "dobre dopasowanie";
		} else if (breed.score >= 55) {
			breed.compatibility = "przeciętne dopasowanie";
		} else {
			breed.compatibility = "złe dopasowanie";
		}
	});
}

// sets score visual effects for dog breeds
function setScore() {
	const breedsItems = document.querySelectorAll(".breeds-item");
	breedsItems.forEach((breed) => {
		const score = breed.getAttribute("data-score");
		breed.style.setProperty("--score-content", `"${score}"`);
	});
}

// sets compatibility visual effects for dog breeds
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

// sort breeds by quiz score percantage compatibility
function sortBreedsByCompatibility() {
	const container = document.getElementById("main-breeds-list");
	const dogs = Array.from(container.children);

	dogs.sort((b, a) => {
		const scoreA = a.dataset.score ? parseInt(a.dataset.score) : Infinity;
		const scoreB = b.dataset.score ? parseInt(b.dataset.score) : Infinity;
		return scoreA - scoreB;
	});

	dogs.forEach((dogElement) => container.appendChild(dogElement));
}

////////////////////////////////////////////////////////////// EVENT LISTENERS

email.addEventListener("click", copyMailAdress);
filterBtns.forEach((btn) => {
	btn.addEventListener("click", toggleFilter);
});
groupBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		handleSingleGroupChanges(btn);
	});
});
mainQuizBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.body.classList.remove("loaded"); // temporarily removes overflow
		setTimeout(() => {
			location.href = "./breed-selector.html";
		}, animationTime);
	});
});
mainBreedsBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.body.classList.remove("loaded");
		setTimeout(() => {
			location.href = "./breeds-list.html";
		}, animationTime);
	});
});
navListBtn.addEventListener("mousedown", (e) => {
    if (e.button === 1) { 
        e.preventDefault();
        window.open("./breeds-list.html", "_blank");
    } else if (e.button === 0) { 
        document.body.classList.remove("loaded");
        setTimeout(() => {
            location.href = "./breeds-list.html";
        }, animationTime);
    }
});
navQuizBtn.addEventListener("mousedown", (e) => {
    if (e.button === 1) { 
        e.preventDefault();
        window.open("./breed-selector.html", "_blank");
    } else if (e.button === 0) { 
        document.body.classList.remove("loaded");
        setTimeout(() => {
            location.href = "./breed-selector.html";
        }, animationTime);
    }
});
navResultsBtn.addEventListener("mousedown", (e) => {
    if (e.button === 1) { 
        e.preventDefault();
        window.open("./results.html", "_blank");
    } else if (e.button === 0) { 
        document.body.classList.remove("loaded");
        setTimeout(() => {
            location.href = "./results.html";
        }, animationTime);
    }
});
navLogo.addEventListener("mousedown", (e) => {
    if (e.button === 1) { 
        e.preventDefault();
        window.open("./index.html", "_blank");
    } else if (e.button === 0) { 
        document.body.classList.remove("loaded");
        setTimeout(() => {
            location.href = "./index.html";
        }, animationTime);
    }
});
if (resultsBtn) {
	resultsBtn.addEventListener("click", () => {
		document.body.classList.remove("loaded");
		setTimeout(() => {
			location.href = "./results.html";
		}, animationTime);
	});
}
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

// forces reload to properly load animation on mobile versions
window.addEventListener("pageshow", function (event) {
	if (event.persisted) {
		window.location.reload();
	}
});

window.addEventListener("load", () => {
	document.body.classList.add("loaded");
});

////////////////////////////////////////////////////////// DOM

document.addEventListener("DOMContentLoaded", function () {
	if (document.body.getAttribute("data-page") === "breeds-list") {
		fetchDogBreeds().then(() => {
			const breedsItems = document.querySelectorAll(".breeds-item");
			breedsItems.forEach((breedBtn) => {
				breedBtn.addEventListener("click", () => {
					outAnimation();
				});
			});
			goToBreed();
		});
	}

	if (document.body.getAttribute("data-page") === "results") {
		checkQuiz();
		fetchDogBreeds().then(() => {
			const breedsItems = document.querySelectorAll(".breeds-item");
			breedsItems.forEach((breedBtn) => {
				breedBtn.addEventListener("click", () => {
					outAnimation();
				});
			});
		});
	}

	if (document.body.getAttribute("data-page") === "breed-details") {
		fetchDogBreeds().then(() => {
			let currentDogName = localStorage.getItem("currentDogName");
			showBreedDetails();
		});
	}

	handlePseudosliderChanges();
	handleCheckboxChanges();
	footerYear();
});
