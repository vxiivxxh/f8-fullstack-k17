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
function showError(input, message, iconEl, errorEl, baseClass) {
  // Reset về class gốc + border đỏ
  input.className = baseClass + " border-red-500 bg-red-50 focus:ring-red-500";

  //Hiện thông báo error
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");

  // Hiện icon lỗi
  iconEl.classList.remove("hidden");
  iconEl.innerHTML = `<i class="fa-solid fa-circle-exclamation text-red-500"></i>`;
}

//Hiển thị success
function showSuccess(input, iconEl, errorEl, baseClass) {
  // Reset về class gốc + border xanh
  input.className = baseClass + " border-green-500 focus:ring-green-500";

  // Ẩn thông báo lỗi
  errorEl.classList.add("hidden");

  // Hiện icon thành công
  iconEl.classList.remove("hidden");
  iconEl.innerHTML = `<i class="fa-solid fa-circle-check text-green-500"></i>`;
}

// Validate username
function validateUsername() {
  const value = username.value;

  //Kiểm tra có rỗng không
  if (value.trim() === "") {
    showError(
      username,
      "Username cannot be blank",
      iconUsername,
      errorUsername,
      usernameBaseClass
    );
    return false;
  }
  //Kiểm tra  khoảng trắng
  if (/\s/.test(value)) {
    showError(
      username,
      "Username cannot contain whitespace",
      iconUsername,
      errorUsername,
      usernameBaseClass
    );
    return false;
  }
  showSuccess(username, iconUsername, errorUsername, usernameBaseClass);
  return true;
}

// Validate email
function validateEmail() {
  const value = email.value.trim();
  //Kiểm tra có rỗng không
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
  //Kiểm tra định dạng email
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

  showSuccess(email, iconEmail, errorEmail, emailBaseClass);
  return true;
}

//Validate pasword
function validatePassword() {
  const value = password.value;

  //Kiểm tra có rỗng không
  if (value === "") {
    showError(
      password,
      "Password cannot be blank",
      iconPassword,
      errorPassword,
      passwordBaseClass
    );
    return false;
  }

  //Kiểm tra  có khoảng trắng không
  if (/\s/.test(value)) {
    showError(
      password,
      "Password cannot contain whitespace",
      iconPassword,
      errorPassword,
      passwordBaseClass
    );
    return false;
  }

  //Kiểm tra độ dài
  if (value.length < 8) {
    showError(
      password,
      "Password must be at least 8 characters",
      iconPassword,
      errorPassword,
      passwordBaseClass
    );
    return false;
  }

  //Kiểm tra ký tự hoa, thường, số
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
    showError(
      password,
      "Password must contain uppercase, lowercase and digit",
      iconPassword,
      errorPassword,
      passwordBaseClass
    );
    return false;
  }
  showSuccess(password, iconPassword, errorPassword, passwordBaseClass);
  return true;
}

//Validate confirm password
function validateConfirm() {
  const value = confirmPassword.value;
  //Kiểm tra có rỗng không
  if (valuer == "") {
    showError(
      confirmPassword,
      "Confirm Password cannot be blank",
      iconConfirm,
      errorConfirm,
      confirmPasswordBaseClass
    );
    return false;
  }

  //Kiểm tra khớp với password
  if (value !== password.value) {
    showError(
      confirmPassword,
      "Passwords do not match",
      iconConfirm,
      errorConfirm,
      confirmPasswordBaseClass
    );
    return false;
  }

  showSuccess(
    confirmPassword,
    iconConfirm,
    errorConfirm,
    confirmPasswordBaseClass
  );
  return true;
}



// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Ngăn reload trang

  //Validate tất cả các trường
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirm();

  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    alert("Form submitted successfully");
  }
});
