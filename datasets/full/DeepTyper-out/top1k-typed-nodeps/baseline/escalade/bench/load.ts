console.time('find-up');
const findup: any = require('find-up');
console.timeEnd('find-up');

console.time('escalade');
const escalade: any = require('escalade');
console.timeEnd('escalade');

console.time('escalade/sync');
const sync: any = require('escalade/sync');
console.timeEnd('escalade/sync');
