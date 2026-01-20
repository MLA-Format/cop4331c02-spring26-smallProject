// TODO: Add actual prefix
const urlPrefix = 'http://x/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function login() {
}

function logout() {
}

// Saves a cookie that will be used for user validation.
function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));

	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

// Reads a cookie for user validation.
function readCookie() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");

	for (var i = 0; i < splits.length; i++) {
		let this = splits[i].trim();
		let tokens = this.split("=");

		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		} else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		} else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.loction.href = "index.html";
	} else {
		// TODO: Logic for logging in. URL should just use firstname/lastnamae
	}
}

function addUser() {
}

function addContact() {
}

function searchContact() {
}

function deleteContact() {
}

function editContact() {
}


