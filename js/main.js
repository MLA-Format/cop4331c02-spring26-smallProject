// TODO: Add actual prefix
const urlPrefix = "http://sp.cop4331c02s26.malcock.com/LAMPAPI";
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let firstNameRef = document.getElementById("firstName");
let lastNameRef = document.getElementById("lastName");
let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-1");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-1");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
    eyeL.style.cssText = `
        left: 0.6em;
        top: 0.6em;
    `;
    eyeR.style.cssText = `
        right: 0.6em;
        top: 0.6em;
    `;
};

let normalHandStyle = () => {
    handL.style.cssText = `
        height: 2.81em;
        top: 8em;
        left: 7.5em;
        transform: rotate(0deg);
    `;
    handR.style.cssText = `
        height: 2.81em;
        top: 8em;
        right: 7.5em;
        transform: rotate(0deg);
    `;
}

usernameRef.addEventListener("focus", () => {
    eyeL.style.cssText = `
        left: 0.75em;
        top: 1.12em;
    `;
    eyeR.style.cssText = `
        right: 0.75em;
        top: 1.12em;
    `;
    normalHandStyle();
});

if (firstNameRef) {
    firstNameRef.addEventListener("focus", () => {
        eyeL.style.cssText = `
            left: 0.75em;
            top: 1.12em;
        `;
        eyeR.style.cssText = `
            right: 0.75em;
            top: 1.12em;
        `;
        normalHandStyle();
    });
}

if (lastNameRef) {
    lastNameRef.addEventListener("focus", () => {
        eyeL.style.cssText = `
            left: 0.75em;
            top: 1.12em;
        `;
        eyeR.style.cssText = `
            right: 0.75em;
            top: 1.12em;
        `;
        normalHandStyle();
    });
}

passwordRef.addEventListener("focus", () => {
    handL.style.cssText =  `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);
    `;
    handR.style.cssText =  `
        height: 6.56em;
        top: 3.87em;
        right: 11.75em;
        transform: rotate(155deg);
    `;
});

document.addEventListener("click", (e) => {
    let clickedElem = e.target;
    
    if (clickedElem == usernameRef || clickedElem == passwordRef || clickedElem == firstNameRef || clickedElem == lastNameRef) {
        eyeL.style.top = "1.2em";
        eyeR.style.top = "1.2em";
    } else {
        normalEyeStyle();
        normalHandStyle(); 
    }
});


function login() {
	console.log("LOGIN attempt");
    console.log("Username:", usernameRef.value);
    console.log("Password:", passwordRef.value);

	userId = 0;
	firstName = "";
	lastName = "";


	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	// TODO: Implement hash function here. Note: MD5 may not be secure.

	document.getElementById("loginResult").innerHTML = "";

	// TODO: Change password to be hashed value.
	let tmp = { login: login, password: password };

	let jsonPayload = JSON.stringify(tmp);

	// TODO: Add path for php login api.
	let url = urlPrefix + '/login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObj = JSON.parse(xhr.responseText);
				userId = jsonObj.id;


				if (jsonObj.error) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect.";
					return;
				}

				firstName = jsonObj.firstName;
				lastName = jsonObj.lastName;

				saveCookie();

				// TODO: Add correct page html value.
				window.location.href = "ContactManager.html";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function logout() {
	userId = 0;
	firstName = "";
	lastName = "";

	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}


function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));

	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}


function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");

    for (var i = 0; i < splits.length; i++)
    {
        let item = splits[i].trim();
        let tokens = item.split("=");

        if (tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName")
        {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId")
        {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0)
    {
        window.location.href = "index.html";
    }
    else
    {
        // ✅ PRINT LOGGED IN USER
        document.getElementById("userName").innerHTML =
            "Welcome, " + firstName + " " + lastName + "!";
    }
}


function addUser() {
    console.log("SIGN UP attempt");
    console.log("First:", firstNameRef.value);
    console.log("Last:", lastNameRef.value);
    console.log("Username:", usernameRef.value);
    console.log("Password:", passwordRef.value);

    // Basic validation
    if (!firstNameRef.value || !lastNameRef.value || !usernameRef.value || !passwordRef.value) {
        document.getElementById("signupResult").innerHTML = "Please fill in all fields.";
        return;
    }

    // Prepare payload
    let payload = {
        firstNameRef: firstNameRef.value.trim(),
        lastNameRef: lastNameRef.value.trim(),
        username: usernameRef.value.trim(),
        password: passwordRef.value.trim() 
    };

    let jsonPayload = JSON.stringify(payload);

    let url = urlPrefix + '/userRegistration.' + extension; 

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    document.getElementById("signupResult").innerHTML = "Creating user...";

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            try {
                let response = JSON.parse(this.responseText);

                if (response.err || response.error) {
                    document.getElementById("signupResult").innerHTML =
                        "Error: " + (response.err || response.error);
                    return;
                }

                if (this.status === 200) {
                    document.getElementById("signupResult").innerHTML =
                        "User created successfully!";

                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                } else {
                    document.getElementById("signupResult").innerHTML =
                        "Server error: " + this.status;
                }
            } catch (e) {
                document.getElementById("signupResult").innerHTML =
                    "Invalid server response";
                console.error(e);
            }
        }
    };

    xhr.send(jsonPayload);
}

function addContact()
{
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phoneNumber").value.trim();

    if (!firstName || !lastName || !email || !phone)
    {
        document.getElementById("AddResult").innerHTML = "Please fill in all fields.";
        return;
    }

    let tmp = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        userID: userId   // 🔥 Use global userId from login
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlPrefix + '/addContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    document.getElementById("AddResult").innerHTML = "Adding contact...";

    xhr.onreadystatechange = function()
    {
        if (this.readyState === 4)
        {
            try
            {
                let jsonObject = JSON.parse(this.responseText);

                if (jsonObject.error)
                {
                    document.getElementById("AddResult").innerHTML = jsonObject.error;
                    return;
                }

                document.getElementById("AddResult").innerHTML = "Contact Added Successfully!";
                
                // Clear fields
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phoneNumber").value = "";

                searchContact(); // refresh list
            }
            catch (err)
            {
                document.getElementById("AddResult").innerHTML = "Server response error.";
                console.error(err);
            }
        }
    };

    xhr.send(jsonPayload);
}


function searchContact()
{
    let search = document.getElementById("searchText").value.trim();

    let tmp = {
        userID: userId,
        name: search
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlPrefix + '/searchContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    document.getElementById("SearchResult").innerHTML = "Searching...";
    document.getElementById("ContactList").innerHTML = "";
    document.getElementById("expandResultsBtn").style.display = "none"; // hide by default

    xhr.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            try
            {
                let jsonObject = JSON.parse(this.responseText);

                if (jsonObject.error && jsonObject.error !== "")
                {
                    document.getElementById("SearchResult").innerHTML = jsonObject.error;
                    return;
                }

                let contacts = jsonObject.results;

                if (!contacts || contacts.length === 0)
                {
                    document.getElementById("SearchResult").innerHTML = "No Contacts Found.";
                    return;
                }

                document.getElementById("SearchResult").innerHTML = "";

                let contactListHTML = "";

                for (let i = 0; i < contacts.length; i++)
                {
                    contactListHTML += `
                        <div class="contact-item">
                            <div class="contact-info">
                                <strong>${contacts[i].firstName} ${contacts[i].lastName}</strong><br>
                                📧 ${contacts[i].email}<br>
                                📞 ${contacts[i].phone}
                            </div>

                            <div class="dropdown">
                                <button class="dots-btn" onclick="toggleDropdown(this)">⋮</button>

                                <div class="dropdown-content">
                                    <button onclick="openEditContactModal(
                                        ${contacts[i].ID},
                                        '${contacts[i].firstName}',
                                        '${contacts[i].lastName}',
                                        '${contacts[i].email}',
                                        '${contacts[i].phone}'
                                    )">
                                        Edit
                                    </button>

                                    <button onclick="deleteContact(${contacts[i].ID})">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }

                document.getElementById("ContactList").innerHTML = contactListHTML;

                // Show Expand Results button since we have contacts
                document.getElementById("expandResultsBtn").style.display = "inline-block";
            }
            catch (err)
            {
                document.getElementById("SearchResult").innerHTML = "Search failed.";
                console.error(err);
            }
        }
    };

    xhr.send(jsonPayload);
}


function deleteContact() {
}

function editContact() {
}


function toggleDropdown(button)
{
    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== button.parentElement)
        {
            d.classList.remove("show");
        }
    });

    button.parentElement.classList.toggle("show");
}

// Close dropdown if clicking outside
document.addEventListener("click", function(e)
{
    if (!e.target.matches(".dots-btn"))
    {
        document.querySelectorAll(".dropdown").forEach(d => {
            d.classList.remove("show");
        });
    }
});

function openResultsModal() {
    document.getElementById("resultsModal").style.display = "block";

    // Copy contact list to modal
    document.getElementById("FullContactList").innerHTML =
        document.getElementById("ContactList").innerHTML;
}

function closeResultsModal() {
    document.getElementById("resultsModal").style.display = "none";
}
