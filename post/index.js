/**Archivo donde construimos una api para los post */
const express = require('express');
const config = require('../config.js');

const post = require('./components/post/network.js');

const errors = require('../network/errors');
//inicializamos nuestra app
const app = express();

//trabajamos con el body parse para procesar peticiones con body
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));

//ROUTER
/*todos los pedidos http://localhost:3030/api/post lo procesará el componente post */
app.use('/api/post', post);

//pasamos nuestro middleware errores a nuestra app express. es importante que sea el ultimo app.use()
app.use(errors);


app.listen(config.postPort, function(){
    console.info(`Servicio Post escuchando en el puerto ${config.host}:${config.postPort}`);
});