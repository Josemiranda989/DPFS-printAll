const fs = require("fs");
const path = require("path");

// const productsPath = path.join(__dirname, "../data/products.json");

const { Product } = require("../database/models");

module.exports = {
  home: async (req, res) => {
    try {
      const products = await Product.findAll();

      // const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      res.render("home.ejs", { products });
    } catch (error) {
      console.log(error);
    }
  },
  helloWorld: async (req, res) => {
    try {
      // const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  },
};
