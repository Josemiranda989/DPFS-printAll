const express = require("express");
const path = require("path");
const app = express();
const port = 4000;

// Setea carpeta publica o estatica
app.use(express.static(__dirname + "/public"));
// Ejs config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Config form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./routes/main.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");

app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`
    Server running in:
    http://localhost:${port}`);
});
