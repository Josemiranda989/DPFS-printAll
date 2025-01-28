const express = require("express");
const { home } = require("../controller/main.controller");
const router = express.Router();

// Home
router.get("/", home);

module.exports = router;
