/**Base de datos de prueba */

const db = {
    "user": [
        {id: '1', name: 'Alberto'},
        {id: '2', name: 'José'},
        {id: '3', name: 'Fernando'}
    ]
};

//definimos list como funcion asincrona que devuelve a tomaticamente una promesa
async function list(table){
    return db[table];
}

async function get(table, id){
    let collection = await list(table);
    return collection.find(item => item.id === id) || null;
}

/**insertamos datos si no existen o los modificamos si existen */
async function upsert(table, data){
    if(!db[table]){
        db[table] = [];
    }

    db[table].push(data);
    console.info(db);
}

async function remove(table, id){
   return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
}