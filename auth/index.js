/**Generamos el Token */
const jwt = require('jsonwebtoken');

const config = require('../config.js');
const error = require('../utils/errors.js');

/**
 * funcion para firmar el token
 * @param {*} data -> informacion del usuario
 */
function sign(data){
    return jwt.sign(data, config.secret);
}

function verify(token){
    return jwt.verify(token, config.secret);
}

const check = {
    //la funcion own verifica que el usuario que generó el token es el mismo usuario que queremos comprobar
    own: function(req, owner){
        //realizamos la comprobacion
        const decoded = decodeHeader(req);
        console.log(decoded);

        //COMPROBAMOS SI EL USUARIO PUEDE REALIZAR LA OPERACION 
        //decoded.id -> id del user
        if(decoded.id !== owner){
            throw error('You can not do this operation', 401);
        }
    },

    logged: function(req){
        const decoded = decodeHeader(req);
    }
}

function getToken(auth){
    if(!auth){
        throw error('token not found', 401);
    }

    //nos aseguramos formato del token correcto (el token debe iniciar con Bearer si no es asi error)
    if(auth.indexOf('Bearer') === -1)//no encuentra Bearer en el token
    {
        throw error('Token format invalid', 401);
    }

    //reemplazamos el texto Bearer que viene dentro del token que no nos sirve
    let token = auth.replace('Bearer ', '');
    return token.trim();
}

//decodificamos el token
function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);//sacamos el token de la authorization
    //verificamos validez del token
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}