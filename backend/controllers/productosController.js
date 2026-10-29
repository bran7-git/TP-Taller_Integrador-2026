
const productosService = require("../services/productosService");

// Listar y buscar productos
async function listarProductos(req, res) {
    try {
        const filtros = {};

        if (req.query.buscar) {
            filtros.buscar = String(req.query.buscar);
        }

        if (req.query.marca) {
            filtros.marca = String(req.query.marca);
        }

        if (req.query.talle !== undefined) {
            const talle = Number(req.query.talle);

            if (!Number.isFinite(talle) || talle <= 0) {
                return res.status(400).json({
                    error: "El talle ingresado no es válido"
                });
            }

            filtros.talle = talle;
        }

        const productos =
            await productosService.obtenerProductos(filtros);

        res.json(productos);
    } catch (error) {
        console.error("Error al listar productos:", error.message);

        res.status(500).json({
            error: "No se pudieron obtener los productos"
        });
    }
}

// Obtener detalle de una zapatilla
async function detalleProducto(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "ID de producto inválido"
            });
        }

        const producto =
            await productosService.obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al consultar producto:", error.message);

        res.status(500).json({
            error: "No se pudo obtener el producto"
        });
    }
}

// Consultar stock por talle
async function consultarStock(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "ID de producto inválido"
            });
        }

        const producto =
            await productosService.obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        const stock =
            await productosService.obtenerStockPorProducto(id);

        res.json({
            producto_id: id,
            nombre: producto.nombre,
            stock
        });
    } catch (error) {
        console.error("Error al consultar stock:", error.message);

        res.status(500).json({
            error: "No se pudo consultar el stock"
        });
    }
}

module.exports = {
    listarProductos,
    detalleProducto,
    consultarStock
};
