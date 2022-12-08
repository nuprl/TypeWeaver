console.time('chalk');
const chalk: any = require('chalk');
console.timeEnd('chalk');

console.time('kleur');
const kleur: any = require('../index');
console.timeEnd('kleur');

console.time('kleur/colors');
const colors: any = require('../colors');
console.timeEnd('kleur/colors');

console.time('ansi-colors');
const color: any = require('ansi-colors');
console.timeEnd('ansi-colors');
