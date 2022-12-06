console.log('# Load time');
console.time('minimatch');
export const mm: any = require('minimatch');
console.timeEnd('minimatch');
console.time('micromatch');
export const mi: any = require('..');
console.timeEnd('micromatch');
console.log();
