const express = require('express');
const router = express.Router();

const response = require('../../network/response.js');
const controller = require('./controller.js');

router.get('/', function(req, res){
    const list = controller.list();
    response.success(req, res, list, 200);
});

module.exports = router;