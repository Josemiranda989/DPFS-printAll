const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

const db = require('../database/models');

module.exports = {
  home: async (req, res) => {
    try {
      const productsDB = await db.Product.findAll()
      console.log(productsDB);
      
      const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      res.render("home.ejs", { products });
      
    } catch (error) { 
      console.log(error);
      
    }

  },
  helloWorld: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    res.json(products);
  },
};
