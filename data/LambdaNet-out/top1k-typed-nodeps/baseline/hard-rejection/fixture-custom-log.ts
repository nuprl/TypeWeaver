'use strict';
const hardRejection: Function = require('.');

hardRejection((string: String) => {
	console.log('custom-log', string);
});

Promise.reject(new Error('Unicorn'));
