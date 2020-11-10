const express = require('express');
const router = express.Router();

const response = require('../../../network/response.js');
//index.js
const Controller = require('./index.js');

//Routes
router.post('/login', login);

//Internal functions
function login(req, res, next){
    Controller.login(req.body.username, req.body.password)
        .then((token)=>{
            response.success(req, res, token, 200);
        })
        .catch(next);
        /* .catch((error)=>{
            response.error(req, res, 'Invalid information', 400);
        }) */
}

module.exports = router;