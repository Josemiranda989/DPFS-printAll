const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "../data/users.json");

function userLogged(req, res, next) {
  // res.locals.isAdmin = false;

  if (req.session?.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;

    req.session?.userLogged.role == 1 ? (res.locals.isAdmin = true) : null;
  }

  if (!req.session?.userLogged && req.cookies?.email) {
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    let userToLogin = users.find((user) => user.email == req.cookies.email);
    if (userToLogin) {
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
      req.session?.userLogged.role == "admin"
        ? (res.locals.isAdmin = true)
        : null;
    }
  }

  next();
}

module.exports = userLogged;
