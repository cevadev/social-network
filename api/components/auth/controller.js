const TABLE = 'auth';

//entidad de autenticacion
/** exportamos un funcion que trabaje con el store inyectado y no con el definido en el archivo */
module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy.js');
    }

    function upsert(data){
        const authData = {
            //el id de los datos de autenticacion sera igual al id del usuario 
            id: data.id
        }

        //creamos los campos que necesitamos y actualizamos solo los campos necesitados
        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = data.password;
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
    }
}