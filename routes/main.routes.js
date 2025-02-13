const express = require("express");
const { home, helloWorld } = require("../controller/main.controller");
const router = express.Router();

// Home
router.get("/", home);
// HelloWorld apto para admins
router.get("/hello", helloWorld);

module.exports = router;
