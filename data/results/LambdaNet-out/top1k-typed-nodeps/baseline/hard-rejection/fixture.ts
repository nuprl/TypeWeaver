'use strict';
const hardRejection: Function = require('.');

hardRejection();

Promise.reject(new Error('Unicorn'));
