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
        return res.redirect("/users/profile");
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
      role: "user",
    };
    users.push(newUser);

    fs.writeFileSync(usersPath, JSON.stringify(users, null, "  "));
    res.redirect("/");
  },
  profile: (req, res) => {
    // console.log(req.session.userLogged);
    res.render("users/profile", { user: req.session.userLogged });
  },
  edit: (req, res) => {
    const { id } = req.params;
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    let userFound = users.find((user) => user.id == id);
    if (userFound) {
      return res.render("users/edit", { user: userFound });
    }
    return res
      .status(404)
      .render("not-found.ejs", { title: "Usuario encontrado" });
  },
  processUpdate: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const { id } = req.params;

    const { name, email, direction, phonenumber, password } = req.body;

    console.log("valor de password", password);
    console.log(typeof password);

    let userFound = users.find((user) => user.id == id);

    userFound.name = name;
    userFound.email = email;
    userFound.direction = direction;
    userFound.phonenumber = phonenumber;
    userFound.password =
      password == "" ? userFound.password : bcryptjs.hashSync(password, 10);
    userFound.avatar = req.file?.filename || userFound.avatar;

    fs.writeFileSync(usersPath, JSON.stringify(users, null, "  "));
    req.session.userLogged = userFound;
    res.redirect("/");
  },

  destroy: (req, res) => {
    // 1.Traer el listado de usuarios en una variable
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    // 2.Eliminar Imagen
    let userToDelete = users.find((user) => user.id == req.params.id);
    if (userToDelete.avatar != "default.png") {
      fs.unlinkSync(
        path.join(__dirname, `../public/images/users/${userToDelete.avatar}`)
      );
    }
    // 3.Actualizar el listado excluyendo que coincide con el id a eliminar
    users = users.filter((user) => user.id != req.params.id);
    // 4.Sobreescribir json
    fs.writeFileSync(usersPath, JSON.stringify(users, null, "  "));
    // 4.1 Limpiar session y cookies
    res.clearCookie("email");
    req.session.destroy();
    // 5.Redireccionar
    res.redirect("/");
  },

  logout: (req, res) => {
    res.clearCookie("email");
    req.session.destroy();
    res.redirect("/");
  },
};
