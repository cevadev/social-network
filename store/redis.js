const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    password: config.redisPassword,
});

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);
            /**Para guardar los datos en redis utiliza el esquema clave/valor. el valor lo almacenamos como un strin glargo
             * para eso convertimos los objetos a string cuando guardamos en el BD y los string a objetos como leemos de la BD
             */
            let res = data || null;
            //validamos si nos viene un string y lo convertimos a objeto
            if (data) {
                res = JSON.parse(data);
            }
            resolve(res);
        });
    });
}

function get(table, id) {
    return list(table + '_' + id);
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 80, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert,
};
