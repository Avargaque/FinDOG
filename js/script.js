const email = document.querySelector(".email");
const burgerBtn = document.querySelector(".nav__burger-menu");
const navBtns = document.querySelector(".nav__buttons");
const filterBtns = document.querySelectorAll(".search-filter");
const filter = document.querySelector(".filter");
const resetFilterBtn = document.querySelector(".reset");
const applyFilterBtn = document.querySelector(".apply");

let dogData = []; // Wszystkie psy z JSON
let selectedFilters = {}; // Filtry pseudosliderów
let selectedCheckboxes = {}; // Filtry checkboxów

// fetches dog breeds
async function fetchDogBreeds() {
	try {
		const response = await fetch("../data/breeds.json");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const dogs = await response.json();

		// finds container for dog breeds
		const container = document.getElementById("main-breeds-list");
		if (!container) {
			throw new Error("Container 'main-breeds-list' not found!");
		}

		// creates HTML for each dog breed
		dogs.forEach((dog) => {
			const dogElement = createDogForBreedsList(dog);
			container.appendChild(dogElement);
		});
	} catch (error) {
		console.error("Error loading dog breeds:", error);
	}

	// sorts results alphabetically
	sortBreedsAlphabetically();
}

// creates HTML for a single dog in breed list
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

// toggles filter button
function toggleFilter() {
	if (filter.style.display === "flex") {
		filter.style.display = "none";
	} else {
		filter.style.display = "flex";
	}
}

// hides filter after clicking outside of it
function hideFilter(event) {
	if (
		!filter.contains(event.target) &&
		!Array.from(filterBtns).some((btn) => btn.contains(event.target))
	) {
		filter.style.display = "none";
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

email.addEventListener("click", copyMailAdress);
burgerBtn.addEventListener("click", toggleBurgerMenu);
screen.orientation.addEventListener("change", resetNavAnimations);
filterBtns.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		toggleFilter();

		// adds event listerner if filter is active
		if (filter.style.display === "flex") {
			document.addEventListener("click", hideFilter);
		}
	});
});
if (applyFilterBtn){
	applyFilterBtn.addEventListener("click", toggleFilter);
}



document.addEventListener("DOMContentLoaded", function () {
	if (window.location.href.includes("breeds-list.html")) {
		fetchDogBreeds();
	}

	footerYear();
});

// ogarnąć burdel niżej

document.addEventListener("DOMContentLoaded", () => {
	// Ładowanie danych psów
	async function fetchDogBreeds() {
		try {
			const response = await fetch("../data/breeds.json");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			dogData = await response.json();
			renderDogs(dogData); // Wyświetlenie pełnej listy psów
		} catch (error) {
			console.error("Error loading dog breeds:", error);
		}
	}

	// Renderowanie psów na podstawie filtrów
	function renderDogs(dogs) {
		const container = document.getElementById("main-breeds-list");
		container.innerHTML = ""; // Czyszczenie kontenera

		if (dogs.length === 0) {
			container.innerHTML =
				"<p class='breeds-item__description'>Brak wyników dla wybranych filtrów.</p>";
			return;
		}

		dogs.forEach((dog) => {
			const dogElement = createDogForBreedsList(dog); // Korzystamy z istniejącej funkcji
			container.appendChild(dogElement);
		});

		sortBreedsAlphabetically(); // Sortowanie alfabetyczne po wyświetleniu
	}

	// Obsługa zmian pseudosliderów
	function handlePseudosliderChanges() {
		const pseudosliders = document.querySelectorAll(".pseudoslider");

		pseudosliders.forEach((slider) => {
			const sliderId = slider.getAttribute("data-id");

			let rangeStart = null;
			let rangeEnd = null;

			const values = slider.querySelectorAll(".value");
			const lines = slider.querySelectorAll(".line");

			values.forEach((value) => {
				value.addEventListener("click", () => {
					const clickedValue = parseInt(value.getAttribute("data-value"), 10);

					if (rangeStart === null && rangeEnd === null) {
						// Pierwszy klik, ustalamy początek zakresu
						rangeStart = clickedValue;
						rangeEnd = clickedValue;
					} else if (rangeStart !== null && rangeEnd !== null) {
						// Jeżeli oba punkty zakresu są ustawione
						if (clickedValue === rangeStart || clickedValue === rangeEnd) {
							// Kliknięcie na jeden z już zaznaczonych punktów, resetujemy cały zakres
							rangeStart = null;
							rangeEnd = null;
							delete selectedFilters[sliderId];

							// Upewnijmy się, że usuwamy zaznaczenia natychmiast po odznaczeniu
							updateSelection(values, lines, null, null); // Resetujemy zaznaczenie
						} else if (clickedValue > rangeStart && clickedValue < rangeEnd) {
							// Kliknięcie w wartość środkową w obrębie zakresu, resetujemy zakres
							rangeStart = null;
							rangeEnd = null;
							delete selectedFilters[sliderId];

							// Resetujemy zaznaczenie
							updateSelection(values, lines, null, null);
						} else {
							// Ustawiamy nowy zakres
							rangeStart = Math.min(clickedValue, rangeStart, rangeEnd);
							rangeEnd = Math.max(clickedValue, rangeStart, rangeEnd);
						}
					} else {
						// Jeśli tylko jeden punkt zakresu jest ustawiony, ustawiamy drugi
						rangeEnd = clickedValue;
						if (rangeEnd < rangeStart) {
							[rangeStart, rangeEnd] = [rangeEnd, rangeStart];
						}
					}

					// Zaktualizuj zaznaczenia na sliderze
					updateSelection(values, lines, rangeStart, rangeEnd);

					// Zapisz filtr w obiekcie selectedFilters, jeśli zakres jest ustawiony
					if (rangeStart !== null && rangeEnd !== null) {
						selectedFilters[sliderId] = {
							min: Math.min(rangeStart, rangeEnd),
							max: Math.max(rangeStart, rangeEnd),
						};
					}

					filterDogs(); // Filtruj psy po zmianie
				});

				// Dodanie logiki hover
				value.addEventListener("mouseenter", () => {
					// Jeśli oba punkty zakresu są ustawione, zablokuj hover
					if (rangeStart !== null && rangeEnd !== null) {
						return; // Zatrzymujemy wykonanie funkcji, żeby hover nic nie robił
					}

					if (rangeStart !== null) {
						// Jeśli tylko jeden punkt zakresu jest ustawiony, pokazujemy zakres
						const valueData = parseInt(value.getAttribute("data-value"), 10);
						const min = Math.min(rangeStart, valueData);
						const max = Math.max(rangeStart, valueData);
						updateSelection(values, lines, min, max); // Pokazanie zakresu
					}
				});

				// Przywracanie widoczności pełnego zakresu po wyjściu
				value.addEventListener("mouseleave", () => {
					updateSelection(values, lines, rangeStart, rangeEnd); // Przywracamy zaznaczenie
				});
			});
		});
	}

	// Aktualizacja zaznaczeń pseudoslidera
	function updateSelection(values, lines, rangeStart, rangeEnd) {
		values.forEach((v) => {
			v.classList.remove("selected");
		});
		lines.forEach((l) => l.classList.remove("selected"));

		// Jeśli brak zaznaczenia, nie zmieniamy stylów
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

	// Obsługa zmian w checkboxach
	function handleCheckboxChanges() {
		const checkboxes = document.querySelectorAll(
			".checkbox-container input[type='checkbox']"
		);

		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", () => {
				const group = checkbox.id.split("-")[0]; // Grupa np. "size"
				const value = checkbox.id.split("-")[1]; // Wartość np. "s"

				if (!selectedCheckboxes[group]) {
					selectedCheckboxes[group] = new Set();
				}

				if (checkbox.checked) {
					selectedCheckboxes[group].add(value);
				} else {
					selectedCheckboxes[group].delete(value);
				}

				filterDogs(); // Filtruj psy po zmianie
			});
		});
	}

	// Filtracja psów
	function filterDogs() {
		let filteredDogs = dogData;

		// Filtracja pseudosliderami
		for (const [key, range] of Object.entries(selectedFilters)) {
			filteredDogs = filteredDogs.filter((dog) => {
				return dog[key] >= range.min && dog[key] <= range.max;
			});
		}

		// Filtracja checkboxami
		for (const [group, values] of Object.entries(selectedCheckboxes)) {
			if (values.size > 0) {
				filteredDogs = filteredDogs.filter((dog) => {
					const dogValue = mapCheckboxGroupToDogProperty(group, dog);
					return values.has(dogValue);
				});
			}
		}

		// Jeśli nie ma aktywnych filtrów, pokazujemy wszystkie psy
		if (
			Object.keys(selectedFilters).length === 0 &&
			Object.keys(selectedCheckboxes).length === 0
		) {
			filteredDogs = dogData;
		}

		renderDogs(filteredDogs); // Wyświetlenie wyników po filtracji
	}

	// Mapowanie grup checkboxów na właściwości psa
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

	// resets filters
function resetFilters() {
	// Resetowanie pseudosliderów
	const pseudosliders = document.querySelectorAll(".pseudoslider");
	pseudosliders.forEach((slider) => {
	  const values = slider.querySelectorAll(".value");
	  const lines = slider.querySelectorAll(".line");
  
	  // Usuwanie klas "selected"
	  values.forEach((value) => value.classList.remove("selected"));
	  lines.forEach((line) => line.classList.remove("selected"));
	});
  
	// Czyszczenie obiektu selectedFilters
	selectedFilters = {};
  
	// Resetowanie checkboxów
	const checkboxes = document.querySelectorAll(
	  ".checkbox-container input[type='checkbox']"
	);
	checkboxes.forEach((checkbox) => {
	  checkbox.checked = false; // Odznaczanie checkboxów
	});
  
	// Czyszczenie obiektu selectedCheckboxes
	selectedCheckboxes = {};
  
	// Przywrócenie pełnej listy psów
	renderDogs(dogData);
  }

	// Inicjalizacja funkcji
	fetchDogBreeds();
	handlePseudosliderChanges();
	handleCheckboxChanges();
	if (resetFilterBtn){
		resetFilterBtn.addEventListener("click", resetFilters)
	}
});
