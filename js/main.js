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
    if (eyeL && eyeR) {
    	eyeL.style.cssText = `
        	left: 0.6em;
        	top: 0.6em;
    	`;
    	eyeR.style.cssText = `
        	right: 0.6em;
        	top: 0.6em;
    	`;
    }
};

let normalHandStyle = () => {
    if (handL && handR) {
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
}

if (usernameRef) {
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
}

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
if (passwordRef) {
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
}

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


function searchContact() {
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
    document.getElementById("expandResultsBtn").style.display = "none";

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            try {
                let jsonObject = JSON.parse(this.responseText);

                if (jsonObject.error && jsonObject.error !== "") {
                    document.getElementById("SearchResult").innerHTML = jsonObject.error;
                    return;
                }

                let contacts = jsonObject.results;

                if (!contacts || contacts.length === 0) {
                    document.getElementById("SearchResult").innerHTML = "No Contacts Found.";
                    return;
                }

                document.getElementById("SearchResult").innerHTML = "";

                let contactListHTML = contacts.map(contact => `
                    <div class="contact-item" data-id="${contact.ID}">
                        <div class="contact-info">
                            <strong>${contact.firstName} ${contact.lastName}</strong><br>
                            📧 ${contact.email}<br>
                            📞 ${contact.phone}
                        </div>
                        <div class="dropdown">
                            <button class="dots-btn">⋮</button>
                            <div class="dropdown-content">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                `).join("");

                document.getElementById("ContactList").innerHTML = contactListHTML;

                document.getElementById("expandResultsBtn").style.display = "inline-block";
            } catch (err) {
                document.getElementById("SearchResult").innerHTML = "Search failed.";
                console.error(err);
            }
        }
    };

    xhr.send(jsonPayload);
}


let deleteContactId = null;

// Event delegation for edit/delete buttons
document.addEventListener("click", function(e) {
    // Handle edit and delete button clicks
    if (e.target.classList.contains("edit-btn") || e.target.classList.contains("delete-btn")) {
        const contactEl = e.target.closest(".contact-item");
        if (!contactEl) return;

        const contactId = parseInt(contactEl.dataset.id);
        const contactName = contactEl.querySelector(".contact-info strong").textContent;

        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            openDeleteModal(contactId, contactName);
            // Close dropdown
            document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
        }

        if (e.target.classList.contains("edit-btn")) {
            e.stopPropagation();
            const first = contactName.split(" ")[0];
            const last = contactName.split(" ").slice(1).join(" ");
            const email = contactEl.querySelector(".contact-info").innerHTML.match(/📧 (.+)<br>/)[1];
            const phone = contactEl.querySelector(".contact-info").innerHTML.match(/📞 (.+)/)[1];
            openEditContactModal(contactId, first, last, email, phone);
            // Close dropdown
            document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
        }
    }
});

// DELETE MODAL
function openDeleteModal(contactId, contactName) {
    deleteContactId = contactId;
    document.getElementById("deleteModalText").textContent =
        `Are you sure you want to delete ${contactName}?`;
    document.getElementById("deleteModal").style.display = "block";
}

function closeDeleteModal() {
    deleteContactId = null;
    document.getElementById("deleteModal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    // Attach delete modal buttons
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    const cancelBtn = document.getElementById("cancelDeleteBtn");

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            if (deleteContactId !== null) {
                deleteContact(deleteContactId);
                closeDeleteModal();
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", closeDeleteModal);
    }
}, false);

const deleteModal = document.getElementById("deleteModal");
if (deleteModal) {
    window.addEventListener("click", (e) => {
        if (e.target == deleteModal) closeDeleteModal();
    });
}

function deleteContact(contactId) {

    console.log("made it");
    const tmp = { id: contactId };
    const jsonPayload = JSON.stringify(tmp);
    let url = urlPrefix + '/deleteContact.' + extension;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    document.getElementById("SearchResult").innerHTML = "Processing...";

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) {
                document.getElementById("SearchResult").innerHTML = "Server error (" + this.status + ")";
                return;
            }
            try {
                const jsonObject = JSON.parse(this.responseText);
                if (jsonObject.error || jsonObject.status === "error") {
                    document.getElementById("SearchResult").innerHTML = "Error: " + (jsonObject.error || "Unknown error");
                    return;
                }
                document.getElementById("SearchResult").innerHTML = "Contact deleted successfully!";
                setTimeout(() => { document.getElementById("SearchResult").innerHTML = ""; }, 2000);
                searchContact();
            } catch (err) {
                document.getElementById("SearchResult").innerHTML = "Delete failed (bad server response).";
                console.error(err);
            }
        }
    };

    xhr.send(jsonPayload);
}

// EDIT CONTACT
async function editContact(id, firstName, lastName, email, phone) {
    try {
        const tmp = { id, firstName, lastName, email, phone };
        const jsonPayload = JSON.stringify(tmp);
        const url = `${urlPrefix}/updateContact.${extension}`;
        const resultSpan = document.getElementById("EditResult");
        resultSpan.innerHTML = "Updating...";

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: jsonPayload
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            resultSpan.innerHTML = data.error || "Server error (" + response.status + ")";
            return;
        }

        resultSpan.innerHTML = "Contact updated!";
        searchContact();

        setTimeout(() => {
            closeEditContactModal();
            resultSpan.innerHTML = "";
        }, 800);
    } catch (err) {
        console.error("Edit Contact Error:", err);
        document.getElementById("EditResult").innerHTML = "Update failed.";
    }
}

// =======================
// DROPDOWN
// =======================
document.addEventListener("click", function(e) {
    // Toggle dropdown when dots button is clicked
    if (e.target.matches(".dots-btn")) {
        e.stopPropagation();
        const dropdown = e.target.closest(".dropdown");
        
        // Close other dropdowns
        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== dropdown) d.classList.remove("show");
        });
        
        // Toggle this dropdown
        dropdown.classList.toggle("show");
        return;
    }
    
    // Close dropdowns when clicking outside
    if (!e.target.matches(".dots-btn") && !e.target.closest(".dropdown-content")) {
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
    }
});

// =======================
// MODALS
// =======================
function openResultsModal() {
    document.getElementById("resultsModal").style.display = "block";
    document.getElementById("FullContactList").innerHTML =
        document.getElementById("ContactList").innerHTML;
}

function closeResultsModal() {
    document.getElementById("resultsModal").style.display = "none";
}

window.onclick = function(event) {
    const resultsModal = document.getElementById('resultsModal');
    
    if (event.target === resultsModal) {
        closeResultsModal();
    }

};
