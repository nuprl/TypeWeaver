'use strict';
import hardRejection from '.';

hardRejection((string: string) => {
	console.log('custom-log', string);
});

Promise.reject(new Error('Unicorn'));
