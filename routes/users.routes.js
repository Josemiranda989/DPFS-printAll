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

const router = express.Router();

// Formulario de inicio de sesión
router.get("/login", login);
router.post("/login", processLogin);
// Formulario de registro
router.get("/register", register);
router.post("/register", uploadUser.single("avatar"), processRegister);
// Vista de perfil
router.get("/profile", profile);
// Logout process
router.get("/logout", logout);

module.exports = router;
