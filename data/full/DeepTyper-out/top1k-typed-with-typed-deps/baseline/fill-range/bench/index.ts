'use strict';

const { Suite } = require('benchmark');
const colors: any = require('ansi-colors');
const argv: any = require('minimist')(process.argv.slice(2));
const fill60: any = require('fill-range');
const fill70: any = require('..');

/**
 * Setup
 */

const cycle: void = (e: any, newline: string) => {
  process.stdout.write(`\u001b[G  ${e.target}${newline ? `\n` : ''}`);
};

const bench: void = (name: string, options: any) => {
  const config: any = { name, ...options };
  const suite: any = new Suite(config);
  const add: any = suite.add.bind(suite);
  suite.on('error', console.error);

  if (argv.run && !new RegExp(argv.run).test(name)) {
    suite.add = () => suite;
    return suite;
  }

  console.log(colors.green(`● ${config.name}`));

  suite.add = (key: string, fn: any, opts: any) => {
    if (typeof fn !== 'function') opts = fn;

    add(key, {
      onCycle: (e: any) => cycle(e),
      onComplete: (e: any) => cycle(e, true),
      fn,
      ...opts
    });
    return suite;
  };

  return suite;
};

const skip: void = () => {};
skip.add = () => skip;
skip.run = () => skip;
bench.skip = (name: any) => {
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
