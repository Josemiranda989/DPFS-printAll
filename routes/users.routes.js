const express = require("express");
const {
  login,
  register,
  processRegister,
  processLogin,
  profile,
  logout,
  edit,
  processUpdate,
  destroy,
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
// Formulario para actualizar perfil
router.get("/edit/:id", guestAuth, edit);
router.put("/edit/:id", uploadUser.single("avatar"), processUpdate);
// Delete user
router.delete("/delete/:id", destroy);
// Logout process
router.get("/logout", guestAuth, logout);

module.exports = router;
