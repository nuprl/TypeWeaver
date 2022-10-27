'use strict';

console.log('# Load time');
console.time('picomatch');
export const pm: String = require('..');
console.timeEnd('picomatch');
console.time('minimatch');
export const mm: String = require('minimatch');
console.timeEnd('minimatch');
console.log();
