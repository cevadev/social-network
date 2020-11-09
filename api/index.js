/**Archivo donde construimos el servidor */
const express = require('express');
const config = require('../config.js');


const user = require('./components/user/network.js');

//inicializamos nuestra app
const app = express();

//trabajamos con el body parse para procesar peticiones con body
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));

//ROUTER
//procesamos todos los pedidos http://localhost:3000/api/user
app.use('/api/user', user);


app.listen(config.port, function(){
    console.info(`Api escuchando en el puerto ${config.host}:${config.port}`);
});