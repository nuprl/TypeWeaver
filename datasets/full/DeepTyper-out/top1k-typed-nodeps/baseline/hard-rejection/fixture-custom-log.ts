'use strict';
const hardRejection: any = require('.');

hardRejection(string => {
	console.log('custom-log', string);
});

Promise.reject(new Error('Unicorn'));
