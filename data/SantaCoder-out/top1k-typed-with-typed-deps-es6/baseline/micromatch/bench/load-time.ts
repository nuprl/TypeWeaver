console.log('# Load time');
console.time('minimatch');
export const mm = require('minimatch');
console.timeEnd('minimatch');
console.time('micromatch');
export const mi = require('..');
console.timeEnd('micromatch');
console.log();