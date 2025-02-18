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

    prodFound.name = name || prodFound.name;
    prodFound.description = description || prodFound.description;
    prodFound.category = category || prodFound.category;
    prodFound.colors = colors || prodFound.colors;
    prodFound.filament = filament || prodFound.filament;
    prodFound.size = size || prodFound.size;
    prodFound.price = price || prodFound.price;
    prodFound.available = available || prodFound.available;
    prodFound.image = req.file?.filename || prodFound.image;

    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));
    res.redirect("/");
  },

  destroy: (req, res) => {
    // 1.Traer el listado de productos en una variable
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    // 2.Eliminar Imagen
    let productToDelete = products.find((prod) => prod.id == req.params.id);
    if (productToDelete.image != "default.png") {
      fs.unlinkSync(
        path.join(
          __dirname,
          `../public/images/products/${productToDelete.image}`
        )
      );
    }
    // 3.Actualizar el listado excluyendo que coincide con el id a eliminar
    products = products.filter((prod) => prod.id != req.params.id);
    // 4.Sobreescribir json
    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));
    // 5.Redireccionar
    res.redirect("/");
  },
};
