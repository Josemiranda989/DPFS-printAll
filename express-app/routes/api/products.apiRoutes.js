const express = require("express");
const router = express.Router();

const {
  detail,
  getProducts,
  lastProduct,
} = require("../../controller/api/products.apiController");

// Endpoint de productos
router.get("/", getProducts);

// Endpoint de detalle de un producto
router.get("/detail/:id", detail);

// Endpoint de detalle de un producto
router.get("/last-product", lastProduct);

module.exports = router;
