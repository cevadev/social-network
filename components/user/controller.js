const store = require('../../store/dummy.js');

const TABLA = 'user';

function list(){
    //retornamos los usuarios
    return store.list(TABLA);
}

module.exports = {
    list,
}