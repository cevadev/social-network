/**Base de datos de prueba */

const db = {
    "user": [
        {id: 1, name: 'Alberto'},
        {id: 2, name: 'José'},
        {id: 3, name: 'Fernando'}
    ]
};

function list(table){
    return db[table];
}

function get(table, id){
    let collection = list(table);
    return collection.find(item => item.id === id) || null;
}

/**insertamos datos si no existen o los modificamos si existen */
function upsert(table, data){
    db[collection].push(data);
}

function remove(table, id){
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
}