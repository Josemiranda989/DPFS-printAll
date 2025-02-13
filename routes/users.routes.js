const express = require("express");
const {
  login,
  register,
  processRegister,
  processLogin,
  profile,
  logout,
} = require("../controller/users.controller");
const { uploadUser } = require("../middlewares/multer");
const loggedAuth = require("../middlewares/loggedAuth");
const guestAuth = require("../middlewares/guestAuth");

const router = express.Router();

// Formulario de inicio de sesión
router.get("/login", loggedAuth, login);
router.post("/login", processLogin);
// Formulario de registro
router.get("/register", loggedAuth, register);
router.post("/register", uploadUser.single("avatar"), processRegister);
// Vista de perfil
router.get("/profile", guestAuth, profile);
// Logout process
router.get("/logout", guestAuth, logout);

module.exports = router;
