const { response } = require('express');
const Categoria = require('../models/categoria');

const validarCategoria = async(req, res = response, next) => {

    try {
        // traer la categoria del middleware validar-categoria
        const nombre = req.body.categoria.toUpperCase();
        
        // obtner categoria que coincide con la DB
        const categoria = await Categoria.findOne({nombre});
        
        if(!categoria) {
            return res.status(401).json({
                msg: 'Categoria no existe en DB'
            })
        }

        // Verificar si la categoria está en estado en true (dado de alta)
        if(!categoria.estado) {
            return res.status(401).json({
                msg: 'Categoria con estado false (dado de baja)'
            })
        }


        req.categoria = categoria;

        next()
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Categoria no válida'
        })
    }

}

module.exports = {
    validarCategoria
}