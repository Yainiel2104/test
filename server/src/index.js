const express = require("express");
const cors = require("cors");
const { initializeDatabase, sequelize } = require('./models');
require("dotenv").config();
const path = require("path");

const PORT = process.env.PORT || 3000;

const Rutas = require("./routes/rutas.js"); // Importar rutas


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.URL_FRONT || "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use('/images', express.static(path.join(__dirname, '..', 'assets', 'images')));

app.use("/api", Rutas); // Rutas de seguridad

// Inicializar la aplicación
const startServer = async () => {
    try {
        // Inicializar la base de datos
        await initializeDatabase();

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        process.exit(1);
    }
};

// Manejar cierre graceful de la aplicación
process.on('SIGINT', async () => {
    console.log('Apagando servidor...');
    await sequelize.close();
    process.exit(0);
});

// Iniciar la aplicación
startServer();