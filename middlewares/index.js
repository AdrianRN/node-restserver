const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validaCategoria = require('../middlewares/validar-categoria')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validaCategoria,
}