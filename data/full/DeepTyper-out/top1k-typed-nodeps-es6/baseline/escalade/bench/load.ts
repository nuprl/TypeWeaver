console.time('find-up');
import findup from 'find-up';
console.timeEnd('find-up');

console.time('escalade');
import escalade from 'escalade';
console.timeEnd('escalade');

console.time('escalade/sync');
import sync from 'escalade/sync';
console.timeEnd('escalade/sync');
