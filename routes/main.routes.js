const express = require("express");
const { home, helloWorld } = require("../controller/main.controller");
const router = express.Router();

// Home
router.get("/", home);
// HelloWorld
router.get("/hello", helloWorld);

module.exports = router;
