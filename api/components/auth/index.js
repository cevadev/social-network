/**este archivo se encarga de realizar toda la importacion de los controladores. */

//importamos la bd que queremos configurar por defecto para nuestro controlador
//const store = require('../../../store/dummy.js');
const store = require('../../../store/mysql.js');
const ctrl = require('./controller.js');

/**convertimos al objeto controller en una funcion y le inyectamos el store o Base de datos
*/
module.exports = ctrl(store);