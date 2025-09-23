const routes = require("express").Router();
const productos = require("../controllers/Productos.js");

routes.use("/productos", productos);

module.exports = routes;
