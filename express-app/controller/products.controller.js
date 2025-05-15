const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

const db = require("../database/models");
const { where } = require("sequelize");

module.exports = {
  addForm: async (req, res) => {
    const categories = await db.Category.findAll();
    const filaments = await db.Filament.findAll();
    const sizes = await db.Size.findAll();
    res.render("products/add", { categories, filaments, sizes });
  },
  store: async (req, res) => {
    const { name, description, category, filament, size, price, available } =
      req.body;

    let newProd = {
      name,
      description,
      category_id: category,
      filament_id: filament,
      size_id: size,
      price,
      available: available == "on",
      image: req.file?.filename || "default.png",
    };

    await db.Product.create(newProd);

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
    const categories = await db.Category.findAll();
    const filaments = await db.Filament.findAll();
    const sizes = await db.Size.findAll();
    let prodFound = await db.Product.findByPk(req.params.id);
    res.render("products/edit", { prodFound, categories, filaments, sizes });
  },
  update: async (req, res) => {
    try {
      const { name, description, category, filament, size, price, available } =
        req.body;
      let prodFound = await db.Product.findByPk(req.params.id);
      let prodUpdated = {
        name: name || prodFound.name,
        description: description || prodFound.description,
        category_id: category || prodFound.category_id,
        filament_id: filament || prodFound.filament_id,
        size_id: size || prodFound.size_id,
        price: price || prodFound.price,
        available: available || prodFound.available,
        image: req.file?.filename || prodFound.image,
      };
      await db.Product.update(prodUpdated, {
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
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
