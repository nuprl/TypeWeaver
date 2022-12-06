'use strict';

console.log('# Load time');
console.time('picomatch');
export const pm: string = require('..');
console.timeEnd('picomatch');
console.time('minimatch');
export const mm: string = require('minimatch');
console.timeEnd('minimatch');
console.log();
