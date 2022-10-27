console.log('# Load time');
console.time('minimatch');
export const mm: String = require('minimatch');
console.timeEnd('minimatch');
console.time('micromatch');
export const mi: String = require('..');
console.timeEnd('micromatch');
console.log();
