'use strict';
import hardRejection from '.';

hardRejection((string: String) => {
	console.log('custom-log', string);
});

Promise.reject(new Error('Unicorn'));
