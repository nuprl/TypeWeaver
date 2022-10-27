'use strict';

const { Suite } = require('benchmark');
const chalk: any = require('chalk');
const colors: any = require('..');
const names: string[] = [
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

const cycle: void = (e: any, newline: string) => {
  process.stdout.write('\u001b[G');
  process.stdout.write(`  ${e.target}` + (newline ? '\n' : ''));
};

function bench(name: string): void {
  console.log(`\n# ${name}`);
  const suite: any = new Suite();
  const res: any = {
    run: suite.run.bind(suite),
    add: (key: string, fn: any) => {
      suite.add(key, {
        onCycle: (e: any) => cycle(e),
        onComplete: (e: any) => cycle(e, true),
        fn: fn
      });
      return res;
    }
  };
  return res;
}

bench('All Colors')
  .add('ansi-colors', () => {
    names.forEach((name: any) => colors[name]('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: string) => chalk[name]('foo'));
  })
  .run();

bench('Chained colors')
  .add('ansi-colors', () => {
    names.forEach((name: any) => colors[name].bold.underline.italic('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: any) => chalk[name].bold.underline.italic('foo'));
  })
  .run();

bench('Nested colors')
  .add('ansi-colors', () => fixture(colors))
  .add('chalk', () => fixture(chalk))
  .run();

function fixture(lib: any): any {
  return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
