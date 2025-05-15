const { where } = require("sequelize");
const db = require("../../database/models");

module.exports = {
  getCategories: async (req, res) => {
    let categories = await db.Category.findAll();

    res.json({
      count: categories.length,
      categories,
    });
  },
};
