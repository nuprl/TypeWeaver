const mysql = require('mysql2');

let pool;
let globalUri;

const pools = uri => {
	if (globalUri !== uri) {
		pool = undefined;
		globalUri = uri;
	}

	pool = pool || mysql.createPool(uri);
	return pool.promise();
};

const endPool = () => {
	pool.end();
	globalUri = undefined;
};

module.exports = {
	pool: uri => pools(uri),
	endPool,
};
