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


