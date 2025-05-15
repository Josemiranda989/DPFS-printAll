const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userLogged = require("./middlewares/userLogged");
const db = require("./database/models");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(cors());

/* // Para ver logs de las peticiones
const morgan = require("morgan");
app.use(morgan("tiny"));
 */
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

// Renders
const mainRoutes = require("./routes/main.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
// Api Routes
const usersApiRoutes = require("./routes/api/users.apiRoutes");
const productsApiRoutes = require("./routes/api/products.apiRoutes");
const categoriesApiRoutes = require("./routes/api/categories.apiRoutes");

app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.use("/api/users", usersApiRoutes);
app.use("/api/products", productsApiRoutes);
app.use("/api/categories", categoriesApiRoutes);

app.use(function (req, res) {
  res.status(404).render("not-found.ejs", { title: "No encontrado" });
});

app.listen(port, async () => {
  // await db.sequelize.sync({ force: true });
  // console.log("All models were synchronized successfully.");

  console.log(`
    Server running in:
    http://localhost:${port}`);
});
