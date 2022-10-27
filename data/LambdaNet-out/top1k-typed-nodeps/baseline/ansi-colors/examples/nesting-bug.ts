console.log();

const { bold, cyan, gray, green, red, symbols } = require('./');
const good: String = green(symbols.check);
const bad: String = red(symbols.cross);

console.log(bold(`foo ${cyan.dim('bar')} baz`), good, gray('(ansi-colors)'));

const colorette: Array = require('colorette');
console.log(colorette.bold(`foo ${colorette.cyan(colorette.dim('bar'))} baz`), bad, gray('(colorette)'));

const kleur: Array = require('kleur');
console.log(kleur.bold(`foo ${kleur.cyan.dim('bar')} baz`), bad, gray('(kleur)'));

const chalk: Array = require('chalk');
console.log(chalk.bold(`foo ${chalk.cyan.dim('bar')} baz`), bad, gray('(chalk)'));

console.log();
