const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Productos = sequelize.define('Productos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.fn('gen_random_uuid'),
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNyll: true,
    }
}, {
    tableName: 'productos',
    timestamps: false,
});

module.exports = Productos;