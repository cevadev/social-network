const auth = require('../../../auth/index.js');
const bcrypt = require('bcrypt');

const TABLE = 'auth';

//entidad de autenticacion
/** exportamos un funcion que trabaje con el store inyectado y no con el definido en el archivo */
module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/mysql.js');
    }

    async function login(username, password){
        /**
         * definimos donde esta la data que tenemos
         * el query trae los datos de TABLE donde elcampo username === al parametro username
         */
        const data = await store.query(TABLE, { username: username});

        //compraracion de los hash
        return bcrypt.compare(password, data.password)
            .then((sonIguales)=>{
                if(sonIguales === true){
                    //Generar token
                    return auth.sign(JSON.parse(JSON.stringify(data)));
                }
                else{
                    throw new Error('Invalid information');
                }
            })

        /* if(data.password === password){
            //generamos token, haciendo firmar la data que viene del usuario
            return auth.sign(data);
        }
        else{
            throw new Error('Invalid information');
        } */
    }

    //creamos las sesiones
    async function upsert(data){
        const authData = {
            //el id de los datos de autenticacion sera igual al id del usuario 
            id: data.id
        }

        //creamos los campos que necesitamos y actualizamos solo los campos necesitados
        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            //encriptamos el password
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login,
    }
}