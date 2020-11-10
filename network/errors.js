const response = require('./response');
/**
 * Middleware que gestion todos los errores dentro de la aplicacion
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function errors(err, req, res, next) {
    console.error('[error]', err);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;
