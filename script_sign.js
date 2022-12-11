const form = document.getElementById("Form");
const userName = document.getElementById("user");
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const checkPass = document.getElementById("passCheck");
let checkName = /^[A-Za-z][A-Za-z0-9]{3,13}[A-Za-z]$/;

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkValid();
  if (validation()) {
    const data = {
      userName: userName.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      checkPassword: checkPass.value.trim(),
    };

    fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    location.replace("index_Success.html");
  }
});

function validation() {
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const checkPasswordValue = checkPass.value.trim();

  localStorage.setItem("User", emailValue);

  return (
    userNameValue.match(checkName) &&
    isEmail(emailValue) &&
    passwordValue.length >= 8 &&
    checkPasswordValue === passwordValue
  );
}

function checkValid() {
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const checkPasswordValue = checkPass.value.trim();

  let errors = [];

  if (!userNameValue.match(checkName)) {
    errors.push({
      user: "Username must consist of 5:15 characters, use only letters & numbers, no numbers at the beginning or the end",
    });
  }

  if (!isEmail(emailValue)) {
    errors.push({ email: "The email isn't valid" });
  }

  if (passwordValue.length < 8) {
    errors.push({ pass: "The password must be more than 8 characters" });
  }

  if (checkPasswordValue !== passwordValue) {
    errors.push({ rePass: "Password doesn't match" });
  }

  setError("", errors);
}

function setError(input = "", message) {
  const errorUser = document.getElementById("errorUser");
  const errorEmail = document.getElementById("errorEmail");
  const errorPass = document.getElementById("errorPass");
  const errorPassCheck = document.getElementById("errorCheck");

  message.forEach((item) => {
    if (item.user) {
      errorUser.classList.remove("hide");
      errorUser.innerText = item.user;
    }
    if (item.pass) {
      errorPass.classList.remove("hide");
      errorPass.innerText = item.pass;
    }
    if (item.email) {
      errorEmail.classList.remove("hide");
      errorEmail.innerText = item.email;
    }
    if (item.rePass) {
      errorPassCheck.classList.remove("hide");
      errorPassCheck.innerText = item.rePass;
    }
  });

  setTimeout(() => {
    errorPass.classList.add("hide");
    errorPassCheck.classList.add("hide");
    errorUser.classList.add("hide");
    errorEmail.classList.add("hide");
  }, 20000);
}
