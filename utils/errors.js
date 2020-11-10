/**construimos un error personalizado */
function err(message, code) {
    let e = new Error(message);

    if (code) {
        e.statusCode = code;
    }
    //retornamos un error nuevo
    return e;
}

module.exports = err;
