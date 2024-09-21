const email = document.querySelector(".email");
const burgerBtn = document.querySelector('.nav__burger-menu')
const navBtns = document.querySelector('.nav__buttons')

// puts current year in footer
function footerYear(){
	let currentYear = new Date().getFullYear();
	document.getElementById("currentYear").textContent = currentYear;
}

// copies e-mail address
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

// toggles burger menu
function toggleBurgerMenu(){
	navBtns.classList.toggle('nav__buttons--visible')
}


email.addEventListener("click", copyText);
burgerBtn.addEventListener('click', toggleBurgerMenu)

document.addEventListener("DOMContentLoaded", function(){
	footerYear();
})