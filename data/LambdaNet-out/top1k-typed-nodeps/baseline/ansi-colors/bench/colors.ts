'use strict';

const { Suite } = require('benchmark');
const chalk: Object = require('chalk');
const colors: Object = require('..');
const names: Array = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan'
];

const cycle: Function = (e: HTMLElement, newline: Boolean) => {
  process.stdout.write('\u001b[G');
  process.stdout.write(`  ${e.target}` + (newline ? '\n' : ''));
};

function bench(name: String): Object {
  console.log(`\n# ${name}`);
  const suite: Object = new Suite();
  const res: Object = {
    run: suite.run.bind(suite),
    add: (key: String, fn: String) => {
      suite.add(key, {
        onCycle: (e: Array) => cycle(e),
        onComplete: (e: String) => cycle(e, true),
        fn: fn
      });
      return res;
    }
  };
  return res;
}

bench('All Colors')
  .add('ansi-colors', () => {
    names.forEach((name: String) => colors[name]('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: String) => chalk[name]('foo'));
  })
  .run();

bench('Chained colors')
  .add('ansi-colors', () => {
    names.forEach((name: String) => colors[name].bold.underline.italic('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: String) => chalk[name].bold.underline.italic('foo'));
  })
  .run();

bench('Nested colors')
  .add('ansi-colors', () => fixture(colors))
  .add('chalk', () => fixture(chalk))
  .run();

function fixture(lib: HTMLElement): String {
  return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
