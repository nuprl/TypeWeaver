'use strict';
const util: string = require('util');
const c: HTMLElement = require('..');
console.log(c);

console.log();
console.log('nested colors');
console.log();
console.log(c.yellow(`foo ${c.red.bold('red')} bar ${c.cyan('cyan')} baz`));
console.log(c.yellow('foo', c.red.bold('red'), 'bar', c.cyan('cyan'), 'baz'));
console.log();
console.log();
console.log('chained colors');
console.log();
console.log(c.bold.red('this is a bold red message'));
console.log(c.bold.italic('this is a bold italicized message'));
console.log(c.bold.yellow.italic('this is a bold yellow italicized message'));
console.log(c.green.bold.underline('this is a bold green underlined message'));
console.log();
console.log();
console.log('printf-like formatting');
console.log();
console.log(c.bold.red(util.format('%s:%s', 'foo', 'bar', 'baz')));
console.log();
console.log();
console.log(c.bold.bold(util.format('%s:%s:%s', 'foo', c.red('bar'), 'baz')));
console.log();
console.log();
console.log('features');
console.log();
console.log(c.red('Some', 'red', 'text', 'to', 'display'));
console.log();
console.log();
console.log(c.red('   This is a red string!'));
console.log(c.green('   This is a red string!'));
console.log(c.cyan('   This is a cyan string!'));
console.log(c.yellow('   This is a yellow string!'));
console.log();
console.log();
