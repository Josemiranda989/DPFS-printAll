const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "../data/users.json");

function userLogged(req, res, next) {
  console.log("Se ejecutó el middleware");

  if (req.session?.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  let userToLogin = users.find((user) => user.email == req.cookies.email);
  if (userToLogin) {
    delete userToLogin.password;
    req.session.userLogged = userToLogin;
  }

  next();
}

module.exports = userLogged;
