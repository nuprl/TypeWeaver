console.log('# Load time');
console.time('minimatch');
export const mm: string = require('minimatch');
console.timeEnd('minimatch');
console.time('micromatch');
export const mi: string = require('..');
console.timeEnd('micromatch');
console.log();
