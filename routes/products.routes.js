const express = require("express");
const router = express.Router();

const { addForm, store } = require("../controller/products.controller");
const upload = require("../middlewares/multer");

router.get("/add", addForm);
router.post("/add", upload.single("image"), store);

module.exports = router;
