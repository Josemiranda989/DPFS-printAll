const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "../data/users.json");

module.exports = {
  login: (req, res) => {
    res.render("users/login");
  },
  processLogin: (req, res) => {
    //! Validaciones PENDIENTE
    // Verificar que el mail exista
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    let userToLogin = users.find((user) => user.email == req.body.email);
    if (userToLogin) {
      // Comparar contraseñas
      let passOk = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passOk) {
        // borrar password previo a la creacion de la sesion
        delete userToLogin.password;
        // Generar una sesion
        req.session.userLogged = userToLogin;
        // Recordar usuario
        if (req.body.rememberme == "on") {
          res.cookie("email", userToLogin.email, { maxAge: 60 * 1000 * 60 });
        }
        // Redireccione a la vista de perfil
        res.redirect("/users/profile");
      }
      console.log("Las credenciales son incorrectas");
      return res.redirect("/users/login");
    } else {
      // Si el email no lo encuentra
      console.log("El mail no existe en nuestra DB");
      return res.redirect("/users/login");
    }
  },

  register: (req, res) => {
    res.render("users/register");
  },
  processRegister: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const { name, email, direction, phonenumber, password } = req.body;

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
  profile: (req, res) => {
    // console.log(req.session.userLogged);
    res.render("users/profile", { user: req.session.userLogged });
  },
  logout: (req, res) => {
    res.clearCookie("email");
    req.session.destroy();
    res.redirect("/");
  },
};
