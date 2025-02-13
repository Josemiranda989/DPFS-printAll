const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userLogged = require("./middlewares/userLogged");
const port = 4000;

/* Para ver logs de las peticiones
const morgan = require("morgan");
app.use(morgan("tiny")); */

// Setea carpeta publica o estatica
app.use(express.static(__dirname + "/public"));
// Session
app.use(
  session({ secret: "EstoEsunSecreto", saveUninitialized: true, resave: true })
);
// Cookies
app.use(cookieParser());
// Ejs config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Config form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Agregamos put y delete
app.use(methodOverride("_method"));
// UserLogged
app.use(userLogged);

const mainRoutes = require("./routes/main.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");

app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.use(function (req, res) {
  res.status(404).render("not-found.ejs", { title: "No encontrado" });
});

app.listen(port, () => {
  console.log(`
    Server running in:
    http://localhost:${port}`);
});
