console.time('chalk');
const chalk: String = require('chalk');
console.timeEnd('chalk');

console.time('kleur');
const kleur: String = require('../index');
console.timeEnd('kleur');

console.time('kleur/colors');
const colors: String = require('../colors');
console.timeEnd('kleur/colors');

console.time('ansi-colors');
const color: String = require('ansi-colors');
console.timeEnd('ansi-colors');
