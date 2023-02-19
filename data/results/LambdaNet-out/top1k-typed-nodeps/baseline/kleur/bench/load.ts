console.time('chalk');
const chalk: string = require('chalk');
console.timeEnd('chalk');

console.time('kleur');
const kleur: string = require('../index');
console.timeEnd('kleur');

console.time('kleur/colors');
const colors: string = require('../colors');
console.timeEnd('kleur/colors');

console.time('ansi-colors');
const color: string = require('ansi-colors');
console.timeEnd('ansi-colors');
