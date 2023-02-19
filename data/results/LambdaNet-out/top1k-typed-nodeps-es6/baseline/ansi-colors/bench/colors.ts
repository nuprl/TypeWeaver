'use strict';

import { Suite } from 'benchmark';
import chalk from 'chalk';
import colors from '..';
const names: any[] = [
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

const cycle: Function = (e: HTMLElement, newline: boolean) => {
  process.stdout.write('\u001b[G');
  process.stdout.write(`  ${e.target}` + (newline ? '\n' : ''));
};

function bench(name: string): object {
  console.log(`\n# ${name}`);
  const suite: object = new Suite();
  const res: object = {
    run: suite.run.bind(suite),
    add: (key: string, fn: string) => {
      suite.add(key, {
        onCycle: (e: any[]) => cycle(e),
        onComplete: (e: string) => cycle(e, true),
        fn: fn
      });
      return res;
    }
  };
  return res;
}

bench('All Colors')
  .add('ansi-colors', () => {
    names.forEach((name: string) => colors[name]('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: string) => chalk[name]('foo'));
  })
  .run();

bench('Chained colors')
  .add('ansi-colors', () => {
    names.forEach((name: string) => colors[name].bold.underline.italic('foo'));
  })
  .add('chalk', () => {
    names.forEach((name: string) => chalk[name].bold.underline.italic('foo'));
  })
  .run();

bench('Nested colors')
  .add('ansi-colors', () => fixture(colors))
  .add('chalk', () => fixture(chalk))
  .run();

function fixture(lib: HTMLElement): string {
  return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
