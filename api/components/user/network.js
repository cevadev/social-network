const express = require('express');
const router = express.Router();

const response = require('../../../network/response.js');
//index.js
const Controller = require('../../index.js');

//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

//Internal functions
function list(req, res){
    //nos viene una promesa
    Controller.list()
        .then((list)=>{
            response.success(req, res, list, 200);
        })
        .catch((error)=>{
            response.error(req, res, error.message, 500 );
        });
}

function get(req, res){
    Controller.get(req.params.id)
        .then((user)=>{
            response.success(req, res, user, 200);
        })
        .catch((error)=>{
            response.error(req, res, error.message, 500);
        })

    /* const user = Controller.get(req.params.id);
    response.success(req, res, user, 200); */
}

function upsert(req, res){
    Controller.upsert(req.body)
        .then((user)=>{
            response.success(req, res, user, 201);
        })
        .catch((error)=>{
            response.error(req, res, error, 500);
        })
}

module.exports = router;