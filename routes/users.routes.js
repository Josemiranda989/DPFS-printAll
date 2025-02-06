const express = require("express");
const {
  login,
  register,
  processRegister,
  processLogin,
} = require("../controller/users.controller");
const { uploadUser } = require("../middlewares/multer");

const router = express.Router();

// Formulario de inicio de sesión
router.get("/login", login);
router.get("/processLogin", processLogin);
// Formulario de registro
router.get("/register", register);
router.post("/register", uploadUser.single("avatar"), processRegister);

module.exports = router;
