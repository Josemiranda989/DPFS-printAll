const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
  addForm: (req, res) => {
    res.render("products/add");
  },
  //! TODO AGREGAR ID A LA CREACION
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
      id: products.length + 1,
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
  detail: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    let prodFound = products.find((prod) => prod.id == req.params.id);
    res.render("products/detail", { prodFound });
  },
  editForm: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    let prodFound = products.find((prod) => prod.id == req.params.id);
    res.render("products/edit", { prodFound });
  },
  update: (req, res) => {
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

    let prodFound = products.find((prod) => prod.id == req.params.id);

    (prodFound.name = name || prodFound.name),
      (prodFound.description = description || prodFound.description),
      (prodFound.category = category || prodFound.category),
      (prodFound.colors = colors || prodFound.colors),
      (prodFound.filament = filament || prodFound.filament),
      (prodFound.size = size || prodFound.size),
      (prodFound.price = price || prodFound.price),
      (prodFound.available = available || prodFound.available),
      (prodFound.image = req.file?.filename || prodFound.image);

    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));
    res.redirect("/");
  },
};
