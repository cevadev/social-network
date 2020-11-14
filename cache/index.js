const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();

//trabajamos con el body parse para procesar peticiones con body
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));

// RUTAS
app.use('/', router)

app.listen(config.cacheServicePort, () => {
    console.log('Servicio de caché redis escuchando en el puerto', config.cacheServicePort);
})