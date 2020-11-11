//importamos el auth global
const auth = require('../../../auth/index.js');

/**en este archivo exportamos un middleware */
module.exports = function checkAuth(action){
    //la funcion checkAuth retorna un funcion que es un middleware de express
    function middleware(req, res, next){
        switch(action){
            case 'update':
                //comprobamos si el usuario puede realizar el update. Recuperamos el usuario que quiere hacer cambios
                let owner = req.body.id;
                //la funcion own verifica que el usuario que generó el token es el mismo usuario que queremos comprobar
                auth.check.own(req, owner);
                //si no lanzó error ejecutamos next()
                next();
                break;
            
            case 'follow':
                auth.check.logged(req);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}