
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "Bienvenido a la API de Sneakers",
        estado: "Funcionando correctamente"
    });
});

// Ruta de prueba del servidor
app.get("/api/health", (req, res) => {
    res.json({
        estado: "ok",
        servicio: "Sneakers API"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
