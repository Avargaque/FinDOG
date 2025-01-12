// handles filter pseudosliders
function handlePseudosliderChanges() {
	pseudosliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-id");
		const values = slider.querySelectorAll(".value");

		// selected range
		let rangeStart = null;
		let rangeEnd = null;

		values.forEach((value) => {
			value.addEventListener("click", () =>
				handleValueClick(value, values, sliderId, rangeStart, rangeEnd)
			);
			value.addEventListener("mouseenter", () =>
				handleValueHover(value, values, rangeStart, rangeEnd)
			);
			value.addEventListener("mouseleave", () =>
				updateSelection(values, rangeStart, rangeEnd)
			);
		});
	});
}

// handles selecting a value on a pseudoslider
function handleValueClick(value, values, sliderId, rangeStart, rangeEnd) {
	const clickedValue = parseInt(value.getAttribute("data-value"), 10);

	if (rangeStart === null && rangeEnd === null) {
		rangeStart = clickedValue;
		rangeEnd = clickedValue;
	} else if (rangeStart !== null && rangeEnd !== null) {
		if (clickedValue === rangeStart || clickedValue === rangeEnd) {
			resetRange(values, sliderId, rangeStart, rangeEnd);
		} else if (clickedValue > rangeStart && clickedValue < rangeEnd) {
			resetRange(values, sliderId, rangeStart, rangeEnd);
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

	updateSelection(values, rangeStart, rangeEnd);

	if (rangeStart !== null && rangeEnd !== null) {
		selectedFilters[sliderId] = { min: rangeStart, max: rangeEnd };
	} else {
		delete selectedFilters[sliderId];
	}

	filterDogs();
}

// handles hovering over a value on a pseudoslider
function handleValueHover(value, values, rangeStart, rangeEnd) {
	if (rangeStart === null || rangeEnd === null) return;

	// parses hovered element to int
	const valueData = parseInt(value.getAttribute("data-value"), 10);

	// compares hovered element to selected range
	const min = Math.min(rangeStart, rangeEnd, valueData);
	const max = Math.max(rangeStart, rangeEnd, valueData);

	// updates the visuals
	updateSelection(values, min, max);
}

// resets range of chosen values on a pseudoslider
function resetRange(values, sliderId, rangeStart, rangeEnd) {
	rangeStart = null;
	rangeEnd = null;
	delete selectedFilters[sliderId];
	updateSelection(values, rangeStart, rangeEnd);
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