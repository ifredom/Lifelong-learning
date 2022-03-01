const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function checkRequired(arrInput) {
  arrInput.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input);
    } else {
      showSuccess();
    }
  });
}

function showError(formControl) {
  console.log(formControl);
  var small = formControl.querySelector(".small");
  small.classList.add()
}

function showSuccess(params) {}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkRequired([username, email, password, password2])) {
  }
});
