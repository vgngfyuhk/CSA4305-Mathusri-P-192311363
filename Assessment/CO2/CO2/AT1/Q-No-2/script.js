const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const result = document.getElementById("result");

const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phonePattern =
    /^[6-9][0-9]{9}$/;

function validateName() {
    const name = nameInput.value.trim();

    if (name.length < 3) {
        nameError.textContent =
            "Enter at least 3 characters.";

        nameError.style.color = "red";
        nameInput.className = "invalid";

        return false;
    }

    nameError.textContent = "Valid name.";
    nameError.style.color = "green";
    nameInput.className = "valid";

    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Enter a valid email address.";

        emailError.style.color = "red";
        emailInput.className = "invalid";

        return false;
    }

    emailError.textContent = "Valid email address.";
    emailError.style.color = "green";
    emailInput.className = "valid";

    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();

    if (!phonePattern.test(phone)) {
        phoneError.textContent =
            "Enter a valid 10-digit phone number.";

        phoneError.style.color = "red";
        phoneInput.className = "invalid";

        return false;
    }

    phoneError.textContent = "Valid phone number.";
    phoneError.style.color = "green";
    phoneInput.className = "valid";

    return true;
}

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

phoneInput.addEventListener("input", function () {
    phoneInput.value =
        phoneInput.value.replace(/[^0-9]/g, "");

    validatePhone();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValid = validateName();
    const emailValid = validateEmail();
    const phoneValid = validatePhone();

    if (nameValid && emailValid && phoneValid) {
        result.textContent =
            "Registration completed successfully.";

        result.style.color = "green";
    } else {
        result.textContent =
            "Please correct the invalid fields.";

        result.style.color = "red";
    }
});
