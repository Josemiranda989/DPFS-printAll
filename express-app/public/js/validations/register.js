window.onload = () => {
  const form = document.querySelector("form");
  const errorList = document.querySelector(".errors");

  form.onsubmit = (e) => {
    errorList.innerHTML = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const direction = form.direction.value.trim();
    const phonenumber = form.phonenumber.value.trim();
    const password = form.password.value.trim();

    let errors = [];
    if (validator.isEmpty(name)) {
      errors.push("Debes ingresar un nombre");
    }

    if (!validator.isEmail(email)) {
      errors.push("El formato de email no es correcto");
    }

    if (validator.isEmpty(direction)) {
      errors.push("Debes ingresar una direccion");
    }

    if (validator.isEmpty(phonenumber)) {
      errors.push("Debes ingresar un numero");
    }

    if (validator.isEmpty(password)) {
      errors.push("Debes ingresar un password");
    }

    if (!validator.isLength(password, { min: 5 })) {
      errors.push("El password debe tener al menos 6 caracteres");
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorList.classList.add("display-error");
      errors.forEach((err) => {
        errorList.innerHTML += `<li>${err}</li>`;
      });
    } else {
      Swal.fire({
        title: "Registro exitoso!",
        text: "Te redireccionaremos al home!",
        icon: "success",
      });
    }
  };
};
