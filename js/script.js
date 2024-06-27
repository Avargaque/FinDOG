// kopiowanie tekstu do schowka
function copyText() {
	const textarea = document.createElement("textarea");
	textarea.value = this.textContent;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	// pop-up na 2 sekundy
	const popup = document.querySelector(".pop-up");
	popup.classList.add("show");
	setTimeout(() => {
		popup.classList.remove("show");
	}, 2000);
}

// skopiowanie adresu do schowka
const email = document.querySelector(".email");
email.addEventListener("click", copyText);
