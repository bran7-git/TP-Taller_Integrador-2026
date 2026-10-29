
const pool = require("./db/database");

async function probarConexion() {
    try {
        const resultado = await pool.query(`
      SELECT
        current_database() AS base_de_datos,
        NOW() AS fecha_hora
    `);

        console.log("¡Conexión exitosa!");
        console.log(resultado.rows[0]);

        const tablas = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

        console.log("Tablas disponibles:", tablas.rows.map(fila => fila.table_name));
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();
