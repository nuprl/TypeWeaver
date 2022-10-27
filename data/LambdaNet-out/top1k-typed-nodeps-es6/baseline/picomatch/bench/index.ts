'use strict';

import { Suite } from 'benchmark';
import { red } from 'ansi-colors';
import minimist from 'minimist';
import mm from 'minimatch';
import pm from '..';

const argv: Object = minimist(process.argv.slice(2));

/**
 * Setup
 */

const cycle: Function = (e: HTMLElement, newline: Boolean) => {
  process.stdout.write(`\u001b[G  ${e.target}${newline ? '\n' : ''}`);
};

const bench: Function = (name: String, options: Object) => {
  const config: Object = { name, ...options };
  const suite: Object = new Suite(config);
  const add: Function = suite.add.bind(suite);
  suite.on('error', console.error);

  if (argv.run && !new RegExp(argv.run).test(name)) {
    suite.add = () => suite;
    return suite;
  }

  console.log(`\n# ${config.name}`);
  suite.add = (key: String, fn: String, opts: Function) => {
    if (typeof fn !== 'function') opts = fn;

    add(key, {
      onCycle: (e: Array) => cycle(e),
      onComplete: (e: String) => cycle(e, true),
      fn,
      ...opts
    });
    return suite;
  };

  return suite;
};

bench(`${red('.makeRe')} star`)
  .add('picomatch', () => pm.makeRe('*'))
  .add('minimatch', () => mm.makeRe('*'))
  .run();

bench(`${red('.makeRe')} star; dot=true`)
  .add('picomatch', () => pm.makeRe('*', { dot: true }))
  .add('minimatch', () => mm.makeRe('*', { dot: true }))
  .run();

bench(`${red('.makeRe')} globstar`)
  .add('picomatch', () => pm.makeRe('**'))
  .add('minimatch', () => mm.makeRe('**'))
  .run();

bench(`${red('.makeRe')} globstars`)
  .add('picomatch', () => pm.makeRe('**/**/**'))
  .add('minimatch', () => mm.makeRe('**/**/**'))
  .run();

bench(`${red('.makeRe')} with leading star`)
  .add('picomatch', () => pm.makeRe('*.txt'))
  .add('minimatch', () => mm.makeRe('*.txt'))
  .run();

bench(`${red('.makeRe')} - basic braces`)
  .add('picomatch', () => pm.makeRe('{a,b,c}*.txt'))
  .add('minimatch', () => mm.makeRe('{a,b,c}*.txt'))
  .run();
