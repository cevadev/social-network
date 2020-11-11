const TABLE = 'post';

/** exportamos un funcion que trabaje con el store inyectado y no con el definido en el archivo */
module.exports = function(injectedStore){

    let store = injectedStore;
        if(!store){
            store = require('../../../store/mysql.js');
        }
    
    //nuestra funcion list() ahora trabaja con el store inyectado
    async function list(){
        //retornamos los usuarios
        return store.list(TABLE);
    }

    return{
        list,
    }
}