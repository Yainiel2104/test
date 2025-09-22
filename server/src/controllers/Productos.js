const routes = require("express").Router();
const db = require("../database/db.js");
const ProductosModel = require("../models/ProductosModel.js");

//Obtener productos con filtros de limite, ordenar por alguna propiedad y orden asc o desc
routes.get("/", async (req, res) => {
    try {
        const { sort, orden, limit } = req.query;
        const rows = await ProductosModel.findAll({
            order: [[sort || 'nombre', orden || 'DESC']],
            ...(limit && limit !== 'todos' ? { limit: parseInt(limit) } : {})
        });
        return res.status(200).json({ data: rows });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ data: "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte." });
    }
});

//Obtener productos por busqueda de normbre o por un termino especifico
routes.get("/search", async (req, res) => {
    try {
        const { valor, termino } = req.query;
        const rows = await ProductosModel.findAll({
            where: {
                [termino]: termino !== 'precio' && termino !== 'stock' ? { [db.Sequelize.Op.iLike]: `%${valor}%` } : valor
            }
        });
        if (rows.length === 0) {
            return res.status(404).json({ data: "No hay coincidencias, intente con otro término." });
        }
        return res.status(200).json({ data: rows });
    } catch (error) {
        console.log({ error })
        const data = error.cause ? error.message : "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.";
        return res.status(500).json({ data });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Validar si el id es un UUID v4 válido
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidV4Regex.test(id)) {
            return res.status(400).json({ data: "ID de producto inválido." });
        }
        const rows = await ProductosModel.findByPk(id);

        if (!rows) {
            return res.status(404).json({ data: "No se encontró el producto." });
        }
        return res.status(200).json({ data: rows });
    } catch (error) {
        console.log(error)
        const data = error.cause ? error.message : "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.";
        return res.status(500).json({ data });
    }
});

module.exports = routes;