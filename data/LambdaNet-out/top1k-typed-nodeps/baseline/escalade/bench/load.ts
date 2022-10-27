console.time('find-up');
const findup: String = require('find-up');
console.timeEnd('find-up');

console.time('escalade');
const escalade: String = require('escalade');
console.timeEnd('escalade');

console.time('escalade/sync');
const sync: String = require('escalade/sync');
console.timeEnd('escalade/sync');
