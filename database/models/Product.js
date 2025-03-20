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
  };
  const config = {
    tableName: "products",
    paranoid: true,
  };

  const Product = sequelize.define(alias, cols, config);

  return Product;
};

//! Faltan atributos en la sincronización
