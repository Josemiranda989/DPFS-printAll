const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const User = require("../services/User");

const db = require("../database/models");
const usersPath = path.join(__dirname, "../data/users.json");

module.exports = {
  login: (req, res) => {
    //*Ok
    res.render("users/login");
  },
  processLogin: async (req, res) => {
    //* Ok
    try {
      const resultValidation = validationResult(req);
      // console.log(resultValidation.mapped());

      if (resultValidation.isEmpty()) {
        // Verificar que el mail exista
        let userToLogin = await db.User.findOne({
          where: {
            email: req.body.email,
          },
        });
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
              res.cookie("email", userToLogin.email, {
                maxAge: 60 * 1000 * 60,
              });
            }
            // Redireccione a la vista de perfil
            return res.redirect("/users/profile");
          }
          return res.render("users/login", {
            errors: {
              password: {
                msg: "Credenciales inválidas PASSWORD",
              },
            },
            old: req.body,
          });
        } else {
          // Si el email no lo encuentra
          return res.render("users/login", {
            errors: {
              password: {
                msg: "Credenciales inválidas",
              },
              old: req.body,
            },
          });
        }
      } else {
        return res.render("users/login", {
          errors: resultValidation.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  register: (req, res) => {
    //* Ok
    res.render("users/register");
  },
  processRegister: async (req, res) => {
    //*ok
    try {
      const { name, email, direction, phonenumber, password } = req.body;
      let newUser = {
        name,
        email,
        direction,
        phonenumber,
        password: bcryptjs.hashSync(password, 10),
        avatar: req.file?.filename || "default.png",
        role: 0,
      };
      await db.User.create(newUser);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  profile: (req, res) => {
    //* ok
    // console.log(req.session.userLogged);
    res.render("users/profile", { user: req.session.userLogged });
  },
  edit: async (req, res) => {
    //* Ok
    try {
      let userFound = await db.User.findByPk(req.params.id);
      if (userFound) {
        return res.render("users/edit", { user: userFound });
      }
      return res
        .status(404)
        .render("not-found.ejs", { title: "Usuario encontrado" });
    } catch (error) {
      console.log(error);
    }
  },
  processUpdate: async (req, res) => {
    //*Ok
    // Destructuring del body
    const { name, email, direction, phonenumber, password } = req.body;
    // Buscamos en la db el usuario a actualizar
    let userFound = await db.User.findByPk(req.params.id);
    // Actualizamos el usuario con los campos del body
    userFound = {
      ...userFound,
      name: name,
      email: email,
      direction: direction,
      phonenumber: phonenumber,
      password:
        password == "" ? userFound.password : bcryptjs.hashSync(password, 10),
      avatar: req.file?.filename || userFound.avatar,
    };
    // Ejectuamos el update del usario
    await db.User.update(userFound, {
      where: { id: req.params.id },
    });
    // Actualizamos la sesion
    req.session.userLogged = userFound;
    // Redireccionamos
    res.redirect("/");
  },

  destroy: (req, res) => {
    //! PENDIENTE
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
    //* Ok
    res.clearCookie("email");
    req.session.destroy();
    res.redirect("/");
  },
};
