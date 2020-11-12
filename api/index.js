/**Archivo donde construimos el servidor */
const express = require('express');
const config = require('../config.js');

//cliente swagger
const swaggerUI = require('swagger-ui-express');

const user = require('./components/user/network.js');
const auth = require('./components/auth/network.js');

const errors = require('../network/errors');
//inicializamos nuestra app
const app = express();

//trabajamos con el body parse para procesar peticiones con body
app.use(express.json()); 
//habilitamos el body como formulario para que lo convierta en objeto js
app.use(express.urlencoded({extended: true}));

//ROUTER
/*todos los pedidos http://localhost:3000/api/user lo procesará el componente user*/
app.use('/api/user', user);

/*todos los pedidos http://localhost:3000/api/auth lo procesará el componente auth */
app.use('/api/auth', auth);

//llamamos a nuestra documentacion hecha por swagger
const swaggerDoc = require('./swagger.json');

//ruta para la visualizacion de la documentacion de nuestra api
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//pasamos nuestro middleware errores a nuestra app express. es importante que sea el ultimo app.use()
app.use(errors);


app.listen(config.port, function(){
    console.info(`Api escuchando en el puerto ${config.host}:${config.port}`);
});