'use strict';

import { Suite } from 'benchmark';
import colors from 'ansi-colors';
import argvFactory from 'minimist';
const argv: object = argvFactory(process.argv.slice(2));
import fill60 from 'fill-range';
import fill70 from '..';

/**
 * Setup
 */

const cycle: Function = (e: HTMLElement, newline: boolean) => {
  process.stdout.write(`\u001b[G  ${e.target}${newline ? `\n` : ''}`);
};

const bench: Function = (name: string, options: object) => {
  const config: object = { name, ...options };
  const suite: object = new Suite(config);
  const add: Function = suite.add.bind(suite);
  suite.on('error', console.error);

  if (argv.run && !new RegExp(argv.run).test(name)) {
    suite.add = () => suite;
    return suite;
  }

  console.log(colors.green(`● ${config.name}`));

  suite.add = (key: string, fn: string, opts: Function) => {
    if (typeof fn !== 'function') opts = fn;

    add(key, {
      onCycle: (e: any[]) => cycle(e),
      onComplete: (e: string) => cycle(e, true),
      fn,
      ...opts
    });
    return suite;
  };

  return suite;
};

const skip: Function = () => {};
skip.add = () => skip;
skip.run = () => skip;
bench.skip = (name: string) => {
  console.log(colors.cyan('● ' + colors.unstyle(name) + ' (skipped)'));
  return skip;
};

bench('alpha')
  .add('fill 6.0', () => fill60('a', 'z'))
  .add('fill 7.0', () => fill70('a', 'z'))
  .run();

bench('alpha with step')
  .add('fill 6.0', () => fill60('a', 'z', 5))
  .add('fill 7.0', () => fill70('a', 'z', 5))
  .run();

bench('numbers')
  .add('fill 6.0', () => fill60(1, 50))
  .add('fill 7.0', () => fill70(1, 50))
  .run();

bench('numbers with step')
  .add('fill 6.0', () => fill60(1, 50, 5))
  .add('fill 7.0', () => fill70(1, 50, 5))
  .run();

bench('padded')
  .add('fill 6.0', () => fill60('0', '010'))
  .add('fill 7.0', () => fill70('0', '010'))
  .run();

bench('padded with step')
  .add('fill 6.0', () => fill60('0', '010', 2))
  .add('fill 7.0', () => fill70('0', '010', 2))
  .run();

bench('negative, padded with step')
  .add('fill 6.0', () => fill60('-0020', '0020', 2))
  .add('fill 7.0', () => fill70('-0020', '0020', 2))
  .run();
