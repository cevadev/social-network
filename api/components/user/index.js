/**este archivo se encarga de realizar toda la importacion de los controladores. */
const config = require('../../../config.js');

//importamos la bd que queremos configurar por defecto para nuestro controlador
//const store = require('../../../store/dummy.js');
//const store = require('../../../store/mysql.js');
let store, cache;
if(config.remoteDB === true){
    store = require('../../../store/remote-mysql.js');
    cache = require('../../../store/remote-cache');
}
else{
    store = require('../../../store/mysql.js');
    cache = require('../../../store/redis.js');
}

const ctrl = require('./controller.js');

/**convertimos al objeto controller en una funcion 
 * le inyectamos el store y cache
*/
module.exports = ctrl(store, cache);