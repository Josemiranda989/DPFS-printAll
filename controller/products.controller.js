const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
  addForm: (req, res) => {
    res.render("products/add");
  },
  store: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    const {
      name,
      description,
      category,
      colors,
      filament,
      size,
      price,
      available,
    } = req.body;

    let newProd = {
      name,
      description,
      category,
      colors,
      filament,
      size,
      price,
      available,
      image: req.file.filename || "default.png",
    };
    products.push(newProd);

    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));

    res.redirect("/");
  },
};
