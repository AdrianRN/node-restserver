const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoID, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRol,
    validarCategoria
} = require('../middlewares');


const router = Router();


/*
{{url}}/api/productos
*/

// Obtener todos los productos - publico
router.get('/', obtenerProductos);


// Obtener un producto por ID - publico
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),

    validarCampos
], obtenerProductoID);


// Crear producto - privado - cualquier rol (token valido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un número').isNumeric(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos,
    validarCategoria,
    
], crearProducto);

// Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos,
    validarCategoria

], actualizarProducto);

// Borrar producto - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

], borrarProducto);


module.exports = router;