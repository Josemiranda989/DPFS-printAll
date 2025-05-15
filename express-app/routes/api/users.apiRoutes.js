const express = require("express");
const {
  getUsers,
  profile,
} = require("../../controller/api/users.apiController");
const router = express.Router();

// Endpoint de usuarios
router.get("/", getUsers);

// Endpoint de usuarios
router.get("/profile/:id", profile);

module.exports = router;
