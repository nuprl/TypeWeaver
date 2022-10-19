import { Pool } from 'pg';

let pool;
let globalUri;

const pools = uri => {
	if (globalUri !== uri) {
		pool = undefined;
		globalUri = uri;
	}

	pool = pool || new Pool({connectionString: uri});
	return pool;
};

const endPool = () => {
	pool.end();
	globalUri = undefined;
};

export default {
	pool: uri => pools(uri),
	endPool,
};
