module.exports = (sequelize, DataTypes) => {
  const alias = "User";
  const cols = {
    name: {
      type: DataTypes.STRING(255),
      validate: {
        min: 3,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      // validate: {
      //   unique: true,
      // },
    },
    direction: {
      type: DataTypes.STRING,
    },
    phonenumber: {
      type: DataTypes.INTEGER(11),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.BOOLEAN,
      DefaultValue: 0,
    },
  };
  const config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  return User;
};
