const express = require("express");
const router = express.Router();

const {
  detail,
  getProducts,
} = require("../../controller/api/products.apiController");

// Endpoint de productos
router.get("/", getProducts);

// Endpoint de detalle de un producto
router.get("/detail/:id", detail);

module.exports = router;
