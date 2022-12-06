console.log();

const { bold, cyan, gray, green, red, symbols } = require('./');
const good: string = green(symbols.check);
const bad: string = red(symbols.cross);

console.log(bold(`foo ${cyan.dim('bar')} baz`), good, gray('(ansi-colors)'));

const colorette: any[] = require('colorette');
console.log(colorette.bold(`foo ${colorette.cyan(colorette.dim('bar'))} baz`), bad, gray('(colorette)'));

const kleur: any[] = require('kleur');
console.log(kleur.bold(`foo ${kleur.cyan.dim('bar')} baz`), bad, gray('(kleur)'));

const chalk: any[] = require('chalk');
console.log(chalk.bold(`foo ${chalk.cyan.dim('bar')} baz`), bad, gray('(chalk)'));

console.log();
