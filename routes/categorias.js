const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const {
    validarJWT,
    validarCampos,
    esAdminRol
    
} = require('../middlewares')

const router = Router();


/*
{{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - publico
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),

    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier rol (token valido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

], borrarCategoria);




module.exports = router;