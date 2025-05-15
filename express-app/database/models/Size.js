module.exports = (sequelize, DataTypes) => {
  const alias = "Size";
  const cols = {
    name: {
      type: DataTypes.STRING(255),
    },
  };
  const config = {
    tableName: "sizes",
    timestamps: false,
  };

  const Size = sequelize.define(alias, cols, config);

  Size.associate = (model) => {
    Size.hasMany(model.Product, {
      as: "users",
      foreignKey: "size_id",
    });
  };

  return Size;
};
