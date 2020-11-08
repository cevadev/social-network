/**modulo para responder a las peticiones de forma coherente 
 * res maneja todas las respuestas de red
*/

/**Objeto con los codigo de respuesta */
const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}
/**
 * Funcion que prepara un res
 * @param {*} req objeto req
 * @param {*} res objeto res
 * @param {*} message objeto message que contiene el mensaje personalizado
 */
exports.success = function(req, res, message, status){
    //retornamos un objeto como respuestay el status. Si no viene un status enviamos un status 200
    let statusCode = status;
    let statusMessage = message;
    
    if (!status) {
        status = 200;
    }

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(statusCode).send({ 
        error: '',
        body: statusMessage
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} message mensaje de error
 * @param {*} status codigo de estado
 * @param {*} details detalles del error
 */
exports.error = function(req, res, message, status, details){
    //imprimimos lo que ha sucedido
    let statusCode = status;
    let statusMessage = message;
    if(!status){
        status = 500;
    }
    if(!message){
        statusMessage = statusMessages[status];
    }
    res.status(statusCode).send({ 
        error: statusMessage,
        body: '',
    });
}