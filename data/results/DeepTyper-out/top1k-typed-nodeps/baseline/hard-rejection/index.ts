'use strict';
const util: any = require('util');

let installed: boolean = false;

const hardRejection: void = (log = console.error) => {
	if (installed) {
		return;
	}

	installed = true;

	process.on('unhandledRejection', (error: string) => {
		if (!(error instanceof Error)) {
			error = new Error(`Promise rejected with value: ${util.inspect(error)}`);
		}

		log(error.stack);
		process.exit(1);
	});
};

module.exports = hardRejection;
// TODO: Remove this for the next major release
module.exports.default = hardRejection;
