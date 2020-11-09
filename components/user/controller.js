const nanoid = require('nanoid');
const TABLE = 'user';

/** exportamos un funcion que trabaje con el store inyectado y no con el definido en el archivo */
module.exports = function(injectedStore){

    let store = injectedStore;
        if(!store){
            store = require('../../store/dummy.js');
        }
    
    //nuestra funcion list() ahora trabaja con el store inyectado
    async function list(){
        //retornamos los usuarios
        return store.list(TABLE);
    }
    
    async function get(id){
        return store.get(TABLE, id);
    }

    async function upsert(body){
        const user = {
            name: body.name
        }

        if(body.id){
            user.id = body.id;
        }
        else{
            user.id = nanoid();
        }

        return store.upsert(TABLE, user);
    }

    async function remove(id){
        return store.remove(TABLE, id);
    }

    return{
        //retornamos la funcion list
        list,
        get,
        upsert,
        remove,
    };
}