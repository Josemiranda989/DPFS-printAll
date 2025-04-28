window.onload = () => {
  const form = document.querySelector("form");
  const errorList = document.querySelector(".errors");

  form.onsubmit = (e) => {
    errorList.innerHTML = "";

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let errors = [];

    if (!validator.isEmail(email)) {
      errors.push("El formato de email no es correcto");
    }

    if (validator.isEmpty(password)) {
      errors.push("Debes ingresar un password");
    }

    if (!validator.isLength(password, { min: 5 })) {
      errors.push("El password debe tener al menos 6 caracteres");
    }

    if (errors.length > 0) {
      errorList.classList.add("display-error");
      e.preventDefault();
      errors.forEach((err) => {
        errorList.innerHTML += `<li>${err}</li>`;
      });
    }
  };
};
