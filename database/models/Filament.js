module.exports = (sequelize, DataTypes) => {
  const alias = "Filament";
  const cols = {
    name: {
      type: DataTypes.STRING(255),
    },
  };
  const config = {
    tableName: "filaments",
    timestamps: false,
  };

  const Filament = sequelize.define(alias, cols, config);

  Filament.associate = (model) => {
    Filament.hasMany(model.Product, {
      as: "users",
      foreignKey: "filament_id",
    });
  };

  return Filament;
};
