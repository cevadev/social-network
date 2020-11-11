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

function get(table, id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, function(error, data){
            if(error){
                return reject(error);
            }
            resolve(data);
        });
    });
}

//si es un nuevo id lo inserta, si ya existe actualiza la informacion
function insert(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, data, function(error, result){
            if(error){
                return reject(error);
            }
            resolve(result);
        });
    });
}

const update = (table, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], function(error, result){
            if(error){
                return reject(error);
            }
            resolve(result);
        });
    });
}

function query(table, query, join){
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, function(error, result){
            if(error){
                return reject(error);
            }
            resolve(result[0] || null);
        });
    });
}

async function upsert(table, data){
   /*  if(data && data.id){
        return update(table, data);
    }
    else{
        return insert(table, data);
    }
 */
    /* return new Promise((resolve, reject)=>{
        console.info(`Data to be upserted: ${data}`);
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], function(error, result){
            console.info("Upserted data: ", result);
            console.info("Update table: ", table);
            if(error){
                return reject(error);
            }
            resolve(result);
        });
    }); */
    let row = [];
    if(data.id){
        row = await get(table, data.id);
    }
    
    if(row.length === 0){
        return insert(table, data);
    }
    else{
        return update(table, data);
    }
}

handleConnection();

module.exports = {
    list,
    get,
    upsert,
    query,
}