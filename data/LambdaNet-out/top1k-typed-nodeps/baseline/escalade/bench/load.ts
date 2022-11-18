console.time('find-up');
const findup: string = require('find-up');
console.timeEnd('find-up');

console.time('escalade');
const escalade: string = require('escalade');
console.timeEnd('escalade');

console.time('escalade/sync');
const sync: string = require('escalade/sync');
console.timeEnd('escalade/sync');
