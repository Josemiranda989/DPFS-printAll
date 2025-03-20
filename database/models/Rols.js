module.exports = (sequelize, DataTypes) => {
  const alias = "Rol";
  const cols = {
    name: {
      type: DataTypes.STRING(255),
    },
  };
  const config = {
    tableName: "rols",
    timestamps: false,
  };

  const Rol = sequelize.define(alias, cols, config);

  return Rol;
};
