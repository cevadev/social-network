/**Archivo donde construimos el servidor */
const express = require('express');
const config = require('../config.js');

//cliente swagger
const swaggerUI = require('swagger-ui-express');

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

//llamamos a nuestra documentacion hecha por swagger
const swaggerDoc = require('./swagger.json');

//ruta para la visualizacion de la documentacion de nuestra api
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));


app.listen(config.port, function(){
    console.info(`Api escuchando en el puerto ${config.host}:${config.port}`);
});