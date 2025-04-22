const db = require("../../database/models");

module.exports = {
  getProducts: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["category", "size", "filament"],
      attributes: {
        exclude: ["size_id", "filament_id", "category_id"],
      },
      // raw: true,
    });

    products.forEach((prod) => {
      prod.imagesUrl = `http://localhost:4000/images/products/${prod.images}`;
      prod.url = `http://localhost:4000/api/products/detail/${prod.id}`;
    });
    res.json({
      count: products.length,
      //! countByCategory
      products: products,
    });
  },
  detail: async (req, res) => {
    try {
      // Paso 1
      let prodFound = await db.Product.findByPk(req.params.id, {
        include: ["category", "size", "filament"],
        attributes: {
          exclude: ["size_id", "filament_id", "category_id"],
        },
      });
      // Paso 2
      res.json(prodFound);
    } catch (error) {
      console.log(error);
    }
  },
};
