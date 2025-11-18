//elements
const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#check-password");

// icon & error elements
const iconUsername = document.querySelector("#icon-username");
const errorUsername = document.querySelector("#error-username");

const iconEmail = document.querySelector("#icon-email");
const errorEmail = document.querySelector("#error-email");

const iconPassword = document.querySelector("#icon-password");
const errorPassword = document.querySelector("#error-password");

const iconConfirm = document.querySelector("#icon-confirm");
const errorConfirm = document.querySelector("#error-confirm");

// Lưu lại class gốc của input
const usernameBaseClass = username.className;
const emailBaseClass = email.className;
const passwordBaseClass = password.className;
const confirmPasswordBaseClass = confirmPassword.className;

// Hàm validate email
const validateEmailFormat = (email) => {
  return email.includes("@");
};

//Hiển thị Error
function showError(input, message, errorEl, baseClass) {
  // Reset về class gốc + border đỏ
  input.className = baseClass + " border-red-500 bg-red-50 focus:ring-red-500";

  //Hiện thông báo error
  errorEl.textContent = message;
}

// validate email
function validateEmail() {
  const value = email.value.trim();

  if (value === "") {
    showError(
      email,
      "Email cannot be blank",
      iconEmail,
      errorEmail,
      emailBaseClass
    );
    return false;
  }

  if (!validateEmailFormat(value)) {
    showError(
      email,
      "Please enter a valid email",
      iconEmail,
      errorEmail,
      emailBaseClass
    );
    return false;
  }

}
