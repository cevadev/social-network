const express = require('express');
const router = express.Router();

const response = require('../../../network/response.js');
//index.js
const Controller = require('./index.js');

//Routes
router.get('/', list);

function list(req, res, next){
    Controller.list()
        .then((data)=>{
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;