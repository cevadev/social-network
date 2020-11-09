/**este archivo se encarga de realizar toda la importacion de los controladores. */

//importamos la bd que queremos configurar por defecto para nuestro controlador
const store = require('../../store/dummy.js');
const ctrl = require('./controller.js');

/**convertimos al objeto controller en una funcion 
 * le inyectamos el store
*/
module.exports = ctrl(store);