console.time('grand total');
console.time('module loaded');
const colors = require('..');
// const colors = require('clorox');
// const colors = require('chalk');
console.timeEnd('module loaded');

colors.enabled = true;
console.time('colors total');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');

console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red('a red message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red.bold('a red bold message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.cyan.bold('a cyan bold message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.blue.bold('a blue bold message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.bold.green('a bold green message'));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red(`a red ${colors.blue('and blue')} message`));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red(`a red ${colors.bold.yellow('and bold yellow')} message`));
console.timeEnd('diff');
console.time('diff');
console.log(colors.bold.green(`a bold green ${colors.bold.yellow('and bold yellow')} message`));
console.timeEnd('diff');
console.time('diff');
console.log(colors.red(`a red ${colors.white('white')} red ${colors.red('red')} red ${colors.gray('gray')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.blue('blue')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')}red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')}red ${colors.cyan('cyan')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')}red ${colors.red('red')} red ${colors.yellow('yellow')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.green('green')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} red ${colors.red('red')} message`));
console.timeEnd('diff');
console.timeEnd('colors total');
console.timeEnd('grand total');

console.log(colors.yellow(`foo ${colors.red.bold('red')} bar ${colors.cyan('cyan')} baz`));