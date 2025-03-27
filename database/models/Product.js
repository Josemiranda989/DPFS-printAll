const Category = require("./Category");

module.exports = (sequelize, DataTypes) => {
  const alias = "Product";
  const cols = {
    name: {
      type: DataTypes.STRING(255),
      validate: {
        min: 3,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER(11),
    },
    available: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
    },
    // category_id: {
    //   type: DataTypes.INTEGER(11),
    // },
    // filament_id: {
    //   type: DataTypes.INTEGER(11),
    // },
    // size_id: {
    //   type: DataTypes.INTEGER(11),
    // },
  };
  const config = {
    tableName: "products",
    paranoid: true,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (model) => {
    // Asociacion categorias
    Product.belongsTo(model.Category, {
      as: "category",
      foreignKey: "category_id",
    });
    // Asociacion Filamentos
    Product.belongsTo(model.Filament, {
      as: "filament",
      foreignKey: "filament_id",
    });
    // Asociacion categorias
    Product.belongsTo(model.Size, {
      as: "size",
      foreignKey: "size_id",
    });
  };

  return Product;
};
