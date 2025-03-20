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

  return Filament;
};
