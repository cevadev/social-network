/**Archivo donde construimos el servidor */
const express = require('express');
const config = require('../config.js');

const user = require('../components/user/network.js');

//inicializamos nuestra app
const app = express();

//ROUTER
//procesamos todos los pedidos http://localhost:3000/api/user
app.use('/api/user', user);


app.lisen(config.port, function(){
    console.info(`Api escuchando en el puerto ${config.host}:${config.port}`);
});