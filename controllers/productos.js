const { response } = require("express");
const {Producto} = require('../models');




// obtenerProductos - paginado - total - populate ()
const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

      const [total, productos, lastModifiedUser] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
          .limit(limite)
          .skip(desde)
          .populate('usuario', 'nombre')
      ]);


    res.json({
      total,
      productos
    })
}


// obtenerProductoID - populate {}
const obtenerProductoID = async(req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre');

    res.json({
        producto
    })

}


const crearProducto = async(req, res = response) => {


    const { nombre, precio } = req.body;
    let { descripcion } = req.body;
    const usuario = req.usuario._id;
    const categoria = req.categoria._id;

    if(!descripcion) {
        descripcion = 'Not given';
    }

    const nombreDB = await Producto.findOne({nombre});

    if(nombreDB) {
        return res.status(400).json({
            msg: `Producto ${nombreDB.nombre}, ya existe`
        });
    }

    // Generar data a guardar
    const data = {
        nombre,
        precio,
        usuario,
        categoria,
        descripcion
    }

    const producto = new Producto(data);

    await producto.save();

    res.json({
        producto
    })
}

// actualizarProducto
const actualizarProducto = async(req, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.usuario = req.usuario._id;
    data.categoria = req.categoria;
    

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json({
        producto
    })
}

// borrarProducto - estado: false
const borrarProducto = async(req, res = response) => {
    const {id} = req.params;

    const productoBorrar = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});


    res.json({
        productoBorrar
    })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoID,
    actualizarProducto,
    borrarProducto
}