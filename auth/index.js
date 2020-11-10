/**Generamos el Token */
const jwt = require('jsonwebtoken');

const config = require('../config.js');

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
    }
}

function getToken(auth){
    if(!auth){
        throw new Error('token not found');
    }

    //nos aseguramos formato del token correcto (el token debe iniciar con Bearer si no es asi error)
    if(auth.indexOf('Bearer') === -1)//no encuentra Bearer en el token
    {
        throw new Error('Token format invalid');
    }

    //reemplazamos el texto Bearer que viene dentro del token que no nos sirve
    let token = auth.replace('Bearer ', '');
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