'use strict';
const hardRejection: any = require('.');

hardRejection();

Promise.reject(new Error('Unicorn'));
