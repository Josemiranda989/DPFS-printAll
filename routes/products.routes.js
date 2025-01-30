const express = require("express");
const router = express.Router();

const {
  addForm,
  store,
  detail,
  editForm,
  update,
} = require("../controller/products.controller");
const upload = require("../middlewares/multer");

// Vista de formulario de creación
router.get("/add", addForm);
// Procesar la información del form
router.post("/add", upload.single("image"), store);
// Vista del detalle
router.get("/detail/:id", detail);
// Vista de formulario de Edición
router.get("/edit/:id", editForm);
// Procesar la información del form
router.put("/edit/:id", upload.single("image"), update);

module.exports = router;
