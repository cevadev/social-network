/**Generamos el Token */
const jwt = require('jsonwebtoken');

/**
 * funcion para firmar el token
 * @param {*} data -> informacion del usuario
 */
function sign(data){
    return jwt.sign(data, 'secreto');
}

module.exports = {
    sign, 
}