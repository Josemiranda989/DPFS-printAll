const { where } = require("sequelize");
const db = require("../../database/models");

module.exports = {
  getProducts: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["category", "size", "filament"],
      attributes: {
        exclude: ["size_id", "filament_id", "category_id"],
        include: [
          [
            db.sequelize.literal(
              `CONCAT('${process.env.SV_HOST}:${process.env.PORT}/images/products/', Product.image)`
            ),
            "urlAvatar",
          ],
          [
            db.sequelize.literal(
              `CONCAT('${process.env.SV_HOST}:${process.env.PORT}/api/products/detail/', Product.id)`
            ),
            "url",
          ],
        ],
      },
      // raw: true,
    });

    let countByCategory = await db.Product.findAll({
      attributes: [
        "category_id",
        [db.sequelize.fn("COUNT", db.sequelize.col("Product.id")), "count"],
      ],
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["name"],
        },
      ],
      group: ["category_id", "category.id"],
      raw: true,
    });

    // Transformar a objeto
    let countObject = {};
    countByCategory.forEach((item) => {
      countObject[item["category.name"]] = parseInt(item.count);
    });

    res.json({
      count: products.length,
      countByCategory: countObject,
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
  lastProduct: async (req, res) => {
    try {
      // Paso 1
      let prodFound = await db.Product.findOne({
        include: ["category", "size", "filament"],
        attributes: {
          exclude: ["size_id", "filament_id", "category_id"],
        },
        order: [["id", "DESC"]],
      });
      // Paso 2
      res.json(prodFound);
    } catch (error) {
      console.log(error);
    }
  },
};
