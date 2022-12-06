console.time('chalk');
import chalk from 'chalk';
console.timeEnd('chalk');

console.time('kleur');
import kleur from '../index';
console.timeEnd('kleur');

console.time('kleur/colors');
import colors from '../colors';
console.timeEnd('kleur/colors');

console.time('ansi-colors');
import color from 'ansi-colors';
console.timeEnd('ansi-colors');
