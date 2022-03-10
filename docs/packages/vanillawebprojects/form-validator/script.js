const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function getFieldName(input) {
  var id = input.id;
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(arrInput) {
  var isRequired = false;
  arrInput.forEach((inputItem) => {
    if (inputItem.value.trim() === "") {
      showError(inputItem, `${getFieldName(inputItem)} is required`);
      isRequired = true;
    } else {
      showSuccess(inputItem);
    }
  });
  return isRequired;
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  var small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control";
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      ` ${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
function checkEmail(input) {
  var reg = /^[A-Za-z0-9\-_]+@[A-Za-z0-9\-_]+(\.[A-Za-z0-9\-_]{1,3})+$/;
  var result = reg.test(input.value.trim());

  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, ` ${getFieldName(input)} is not valid`);
  }
}
function checkPasswordsMatch(input1, input2) {
  console.log(input1.value !== input2.value);
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

form.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }
});
