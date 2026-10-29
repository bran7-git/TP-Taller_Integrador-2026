
const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

// Obtener todos los productos y aplicar filtros
router.get("/", productosController.listarProductos);

// Obtener stock por talle de un producto
router.get("/:id/stock", productosController.consultarStock);

// Obtener un producto por su ID
router.get("/:id", productosController.detalleProducto);

module.exports = router;
