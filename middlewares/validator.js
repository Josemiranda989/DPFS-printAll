const { check } = require("express-validator");

const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .bail()
    .isEmail()
    .withMessage("El dato ingresado no corresponde a un email"),
  check("password")
    .notEmpty()
    .withMessage("Debes ingresar un password")
    .bail()
    .isLength({ min: 5 })
    .withMessage("La contraseña debe tener almenos 5 caracteres"),
];

const registerValidator = [
  check("name").notEmpty().withMessage("Debes ingresar un nombre"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .bail()
    .isEmail()
    .withMessage("El dato ingresado no corresponde a un email"),
  check("direction").notEmpty().withMessage("Debes ingresar una direccion"),
  check("phonenumber")
    .notEmpty()
    .withMessage("El campo no puee estar")
    .bail()
    .isNumeric()
    .withMessage("Debes ingresar un numero"),
  check("password").notEmpty().withMessage("Debes ingresar un password"),
];

module.exports = { loginValidator, registerValidator };
