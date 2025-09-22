const sequelize = require('../database/db');
const Productos = require('./ProductosModel');

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1); // Salir de la aplicación en caso de error
  }
};

module.exports = {
  sequelize,
  Productos,
  initializeDatabase
};