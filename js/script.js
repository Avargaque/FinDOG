const email = document.querySelector(".email");
const burgerBtn = document.querySelector(".nav__burger-menu");
const navBtns = document.querySelector(".nav__buttons");
const filterBtns = document.querySelectorAll('.search-filter')
const filter = document.querySelector('.filter')

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
	console.log(container);
  
	items.sort((a, b) => {
	  const nameA = a.querySelector(".breeds-item__name").textContent.trim().toLowerCase();
	  const nameB = b.querySelector(".breeds-item__name").textContent.trim().toLowerCase();
	  return nameA.localeCompare(nameB);
	});
  
	container.innerHTML = "";
	items.forEach(item => container.appendChild(item));
  }

// toggles filter button
function toggleFilter(){
	if (filter.style.display === "flex"){
		filter.style.display = "none"
	} else {
		filter.style.display = "flex"
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
filterBtns.forEach((btn) => {btn.addEventListener("click", toggleFilter)})

document.addEventListener("DOMContentLoaded", function () {
	if (window.location.href.includes("breeds-list.html")){
		fetchDogBreeds();
	}

	footerYear();
});



// ogarnąć burdel niżej

document.addEventListener("DOMContentLoaded", () => {
	const pseudosliders = document.querySelectorAll('.pseudoslider');
  
	pseudosliders.forEach(slider => {
	  let startValue = null;
	  let selectedRange = []; // Zaznaczone wartości
  
	  const values = slider.querySelectorAll(".value");
	  const lines = slider.querySelectorAll(".line");
  
	  values.forEach((value, index) => {
		value.addEventListener("click", () => {
		  const clickedValue = parseInt(value.getAttribute("data-value"), 10);
  
		  if (startValue === null || startValue === clickedValue) {
			resetSelection();
			startValue = clickedValue;
			value.classList.add("selected");
			selectedRange = [clickedValue];
		  } else {
			const min = Math.min(startValue, clickedValue);
			const max = Math.max(startValue, clickedValue);
			resetSelection();
			
			// Zaznacz wszystkie wartości pomiędzy
			values.forEach((v) => {
			  const val = parseInt(v.getAttribute("data-value"), 10);
			  if (val >= min && val <= max) {
				v.classList.add("selected");
			  }
			});
  
			// Zaznacz linie między kulkami
			lines.forEach((line, idx) => {
			  const lineValue = idx + 1;
			  if (lineValue >= min && lineValue < max) {
				line.classList.add("selected");
			  } else {
				line.classList.remove("selected");
			  }
			});
  
			selectedRange = [min, max];
		  }
  
		  // Wyświetlanie zakresu w konsoli
		  console.log(`Zaznaczony zakres: ${selectedRange.join(" - ")}`);
		});
  
		// Obsługa hovera nad kulkami
		value.addEventListener("mouseenter", () => {
		  const hoveredValue = parseInt(value.getAttribute("data-value"), 10);
  
		  // Jeśli startValue jest ustawione, wybierz wszystkie kulki pomiędzy
		  if (startValue !== null) {
			const min = Math.min(startValue, hoveredValue);
			const max = Math.max(startValue, hoveredValue);
  
			values.forEach((v) => {
			  const val = parseInt(v.getAttribute("data-value"), 10);
			  if (val >= min && val <= max) {
				v.classList.add("hover-range");
			  } else {
				v.classList.remove("hover-range");
			  }
			});
  
			lines.forEach((line, idx) => {
			  const lineValue = idx + 1;
			  if (lineValue >= min && lineValue < max) {
				line.classList.add("hover-range");
			  } else {
				line.classList.remove("hover-range");
			  }
			});
		  }
		});
  
		// Obsługa zakończenia hovera nad kulkami
		value.addEventListener("mouseleave", () => {
		  values.forEach((v) => v.classList.remove("hover-range"));
		  lines.forEach((line) => line.classList.remove("hover-range"));
		});
	  });
  
	  // Resetowanie zaznaczeń
	  function resetSelection() {
		values.forEach((value) => value.classList.remove("selected"));
		lines.forEach((line) => line.classList.remove("selected"));
	  }
	});
  });
  