// TODO: Add actual prefix
const urlPrefix = 'http://x/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function login() {
	userId = 0;
	firstName = "";
	lastName = "";

	// TODO: Add actual element ids.
	let login = document.getElementById("x").value;
	let password = document.getElementById("loginPassword").value;
	// TODO: Implement hash function here. Note: MD5 may not be secure.

	document = getElementById("x").innerHTML = "";

	// TODO: Change password to be hashed value.
	let tmp = { login: login, password: password };

	let jsonPayload = JSON.stringify(tmp);

	// TODO: Add path for php login api.
	let url = urlPrefix + '' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObj = JSON.parse(xhr.responseText);
				userId = jsonObj.id;

				if (userId < 1) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect.";
					return;
				}

				firstName = jsonObj.firstName;
				lastName = jsonObj.lastName;

				saveCookie();

				// TODO: Add correct page html value.
				window.location.href = "";
			}
		});
		xhr.send(jsonPayload);
	} catch (err) {
		docment.getElementById("x").innerHTML = err.message;
	}
}

function logout() {
	userId = 0;
	firstName = "";
	lastName = "";

	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
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


