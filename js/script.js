// copying text
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
	// 2sec pop-up
	const popup = document.querySelector(".pop-up");
	popup.classList.add("show");
	setTimeout(() => {
		popup.classList.remove("show");
	}, 2000);
}

// copying e-mail address
const email = document.querySelector(".email");
email.addEventListener("click", copyText);

// current year in footer
let currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;