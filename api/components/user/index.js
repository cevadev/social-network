/**este archivo se encarga de realizar toda la importacion de los controladores. */
const config = require('../../../config.js');

//importamos la bd que queremos configurar por defecto para nuestro controlador
//const store = require('../../../store/dummy.js');
//const store = require('../../../store/mysql.js');
let store;
if(config.remoteDB === true){
    store = require('../../../store/remote-mysql.js');
}
else{
    store = require('../../../store/mysql.js');
}

const ctrl = require('./controller.js');

/**convertimos al objeto controller en una funcion 
 * le inyectamos el store
*/
module.exports = ctrl(store);