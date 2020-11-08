const TABLA = 'user';

/** exportamos un funcion que trabaje con el store inyectado y no con el definido en el archivo */
module.exports = function(injectedStore){
    
    //nuestra funcion list() ahora trabaja con el store inyectado
    function list(){
        let store = injectedStore;
        if(!store){
            store = require('../../store/dummy.js');
        }
        //retornamos los usuarios
        return store.list(TABLA);
}   
    return{
        //retornamos la funcion list
        list,
    }
}