/**definimos nuestro servidor que estara escuchando el mysql service en el puerto 3001 */
const express = require('express');

const config = require('../config.js');
const router = require('./network.js');

const app = express();

//trabajamos con el body parse para procesar peticiones con body en json
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));

//Llamamos a nuestro router (network) para procesar todo lo que venga en /
app.use('/', router);

//definimos nuestro servicio de almacenamiento
app.listen(config.mysqlServicePort, function(){
    console.info('mysql service listening on port ', config.mysqlServicePort);
});

