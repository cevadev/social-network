const express = require('express');
const router = express.Router();

//Traemos el middleware secure o intermediario que realiza la comprobacion si el user puede hacer la operacion
const secure = require('./secure.js');
const response = require('../../../network/response.js');
//index.js
const Controller = require('./index.js');

//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
//secure('follow') para asegurarnos que lo puede hacer un unico usuario
router.post('/follow/:id', secure('follow'), follow);
//decimos que el middleware secure se encarga que el update lo haga un unico uuario y sobre su data
router.put('/', secure('update'), upsert);

//Internal functions
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Hemos añadido un middleware en utils/erros.js todos los errores que creamos en el catch
 * utilizamos la funcion  next() que viene dentro de todos los middleware de express y asi automaticamente 
 * no tenemos que gestionar los errores dentro de la ruta sino automaticamente
 */
function list(req, res, next){
    //nos viene una promesa
    Controller.list()
        .then((list)=>{
            response.success(req, res, list, 200);
        })
        .catch(next);
        /* .catch((error)=>{
            response.error(req, res, error, 400);
        }) */
}

function get(req, res, next){
    Controller.get(req.params.id)
        .then((user)=>{
            response.success(req, res, user, 200);
        })
        .catch(next);

    /* const user = Controller.get(req.params.id);
    response.success(req, res, user, 200); */
}

function upsert(req, res, next){
    Controller.upsert(req.body)
        .then((user)=>{
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function follow(req, res, next){
    /**
     * req.user.id -> id del usuario que quiere seguir a alguien (from)
     * req.params.id -> id del usuario a ser seguido (to)
     */
    Controller.follow(req.user.id, req.params.id)
        .then((data)=>{
            response.success(req, res, data, 201);
        })
        .catch(next);
}

module.exports = router;