const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

const db = require("../database/models");

module.exports = {
  addForm: (req, res) => {
    //* Ok
    res.render("products/add");
  },
  store: (req, res) => {
    //! PENDIENTE

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
  detail: async (req, res) => {
    //* Ok
    try {
      // Paso 1
      let prodFound = await db.Product.findByPk(req.params.id);
      // Paso 2
      res.render("products/detail", { prodFound });
    } catch (error) {
      console.log(error);
    }
  },
  editForm: async (req, res) => {
    //* Ok
    let prodFound = await db.Product.findByPk(req.params.id);
    res.render("products/edit", { prodFound });
  },
  update: (req, res) => {
    //! PENDIENTE
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

  destroy: async (req, res) => {
    //* Ok
    /*     
    // Opcional para otro caso
    let productToDelete = await db.Product.findByPk(req.params.id);
    if (productToDelete.image != "default.png") {
      fs.unlinkSync(
        path.join(
          __dirname,
          `../public/images/products/${productToDelete.image}`
        )
      );
    }
       */

    const productDelete = await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log("prodBorrado", productDelete);

    // 5.Redireccionar
    res.redirect("/");
  },
};
