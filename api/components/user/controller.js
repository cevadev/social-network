const { nanoid } = require('nanoid');
/**
 * ../auth -> significa que no vamos a llamar ni al controlador, llamamos al index y es el index
 * quien se encargara de inyectar cual es el almacenamiento de produccion
 */
const auth = require('../auth');

const TABLE = 'user';

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
    
    async function get(id){
        return store.get(TABLE, id);
    }

    /**
     * creamos un auth cada vez que creamos un nuevo user
     */
    async function upsert(body){
        const user = {
            name: body.name,
            username: body.username
        }

        if(body.id){
            user.id = body.id;
        }
        else{
            user.id = nanoid();
        }

        /**1. validamos si hay una contraseña, ya que estamos creando un nuevo user
         * 2. si editamos un user cambiando la contraseña, debemos actualizar la contraseña
         * 3. si editamos un user cambiando el username, debemos actualizar el username
         */
        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLE, user);
    }

    function follow(from, to){
        return store.upsert(`${TABLE}_follow`, {
            user_from: from,
            user_to: to
        });
    }

    async function following(user){
        const join = {};
        join[TABLE] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user};

        return await store.query(TABLE + '_follow', query, join);
    }

    async function remove(id){
        return store.remove(TABLE, id);
    }

    return{
        //retornamos la funcion list
        list,
        get,
        upsert,
        follow,
        following,
        remove,
    };
}