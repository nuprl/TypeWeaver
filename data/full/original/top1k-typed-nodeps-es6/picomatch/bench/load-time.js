'use strict';

console.log('# Load time');
console.time('picomatch');
export const pm = require('..');
console.timeEnd('picomatch');
console.time('minimatch');
export const mm = require('minimatch');
console.timeEnd('minimatch');
console.log();
