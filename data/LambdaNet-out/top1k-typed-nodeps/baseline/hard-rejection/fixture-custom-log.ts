'use strict';
const hardRejection: Function = require('.');

hardRejection((string: string) => {
	console.log('custom-log', string);
});

Promise.reject(new Error('Unicorn'));
