
const pool = require("../db/database");

// Obtener productos activos con filtros opcionales
async function obtenerProductos(filtros = {}) {
    const { buscar, marca, talle } = filtros;

    const condiciones = ["p.activo = TRUE"];
    const valores = [];

    if (buscar) {
        valores.push(`%${buscar}%`);
        condiciones.push(
            `(p.nombre ILIKE $${valores.length} OR p.marca ILIKE $${valores.length})`
        );
    }

    if (marca) {
        valores.push(marca);
        condiciones.push(`p.marca ILIKE $${valores.length}`);
    }

    if (talle !== undefined) {
        valores.push(talle);
        condiciones.push(`
            EXISTS (
                SELECT 1
                FROM stock_productos sp
                JOIN talles t ON t.id = sp.talle_id
                WHERE sp.producto_id = p.id
                  AND t.numero = $${valores.length}
                  AND sp.cantidad > 0
            )
        `);
    }

    const consulta = `
        SELECT
            p.id,
            p.nombre,
            p.marca,
            p.descripcion,
            p.precio,
            p.imagen_url
        FROM productos p
        WHERE ${condiciones.join(" AND ")}
        ORDER BY p.id
    `;

    const resultado = await pool.query(consulta, valores);
    return resultado.rows;
}

// Obtener detalle de un producto
async function obtenerProductoPorId(id) {
    const resultado = await pool.query(
        `SELECT
            id, nombre, marca, descripcion,
            precio, imagen_url
         FROM productos
         WHERE id = $1 AND activo = TRUE`,
        [id]
    );

    return resultado.rows[0] || null;
}

// Obtener stock de un producto por talle
async function obtenerStockPorProducto(id) {
    const resultado = await pool.query(
        `SELECT
            t.numero AS talle,
            sp.cantidad
         FROM stock_productos sp
         JOIN talles t ON t.id = sp.talle_id
         WHERE sp.producto_id = $1
         ORDER BY t.numero`,
        [id]
    );

    return resultado.rows;
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerStockPorProducto
};
