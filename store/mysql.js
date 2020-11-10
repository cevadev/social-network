const mysql = require('mysql');
const config = require('../config.js');

const dbConf = {
    host: config.mysqlHost,
    port: config.mysqPort,
    user: config.mysqlUser,
    password: config.mysqlpassword,
    database: config.mysqlDataBase
}

let connection;

//funcion que maneja toda la conexion con mysql
function handleConnection(){        
    connection = mysql.createConnection(dbConf);

    connection.connect(function(error){
        if(error){
            console.error('[db error] ', error);
            setTimeout(handleConnection, 2000);
        }
        else{
            console.info('DB Connected');
        }
    });

    connection.on('error', function(error){
        console.error('[db error] ', error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            //Si se perdio la conexion, que se vuelta a conectar
            handleConnection();
        }
        else{
            throw error;
        }
    });
}

function list(table){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`, function(error, data){
            if(error){
                return reject(error); 
            }
            resolve(data);
        });
    });
}

handleConnection();

module.exports = {
    list,
}