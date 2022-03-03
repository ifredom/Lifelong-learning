const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function checkRequired(arrInput) {
  console.log(arrInput);
  arrInput.forEach((inputItem) => {
    if (inputItem.value.trim() === "") {
      showError(inputItem);
    } else {
      showSuccess();
    }
  });
}

function showError(formControl) {
  console.log(formControl);
  var small = formControl.querySelector("small");
  formControl.classList.add("error");
}

function showSuccess(params) {}

form.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkRequired([username, email, password, password2])) {
  }
});
