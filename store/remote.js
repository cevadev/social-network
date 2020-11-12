//dependencia para realizar peticiones http mucho mas sencillas
const request = require('request');

function createRemoteDB(host, port){
    //url base
    const URL = `http://${host}:${port}`;

    function list(table) {
        return req('GET', table);
    }

	function get(table, id) {
		return req('GET', table, id);
	}

	function insert(table, data) {
		return req('POST', table, data);
	}

	function update(table, data) {
		return req('PUT', table, data);
	}

	function upsert(table, data) {
		if (data.id) {
			return update(table, data);
		}

		return insert(table, data);
	}

	function query(table, query, join) {
		return req('POST', table + '/query', { query, join });
    }
    
    /**
     * 
     * @param {*} method que utilizamos
     * @param {*} table que accedemos
     * @param {*} data que vamos a llamar
     */
    function req(method, table, data) {
        //configuramos la url a la que hacemos la peticion
        let url = URL + '/' + table;
        body = '';

        if (method === 'GET' && data) {
			url += '/'+ data;
		} else if (data) {
			body = JSON.stringify(data);
		}

        return new Promise((resolve, reject) => {
            //preparamos el request para ejecutarlo
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, //callback de error
            (err, req, body) => {
                if (err) {
                    console.error('Remote Database error ', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        })
    }

    return {
        list,
    }
}

module.exports = createRemoteDB;