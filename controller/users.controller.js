const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "../data/users.json");

module.exports = {
  login: (req, res) => {
    res.render("users/login");
  },

  register: (req, res) => {
    res.render("users/register");
  },
  processRegister: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const { name, email, direction, phonenumber, password } = req.body;
    console.log(req.file);

    let newUser = {
      id: users.length + 1,
      name,
      email,
      direction,
      phonenumber,
      password: bcryptjs.hashSync(password, 10),
      avatar: req.file?.filename || "default.png",
    };
    users.push(newUser);

    fs.writeFileSync(usersPath, JSON.stringify(users, null, "  "));
    res.redirect("/");
  },
  processLogin: (req, res) => {
    let resultado = bcryptjs.compareSync(
      "Milanesa",
      "$2a$10$fs7/I.ApDRJb.h9NWK/8K.AojHUxYManY73TNSsK9z3IdNbaPNTTy"
    );

    res.json(resultado);
  },
};
