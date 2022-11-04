'use strict';

import { Suite } from 'benchmark';
import { red } from 'ansi-colors';
import argvFactory from 'minimist';
const argv: Object = argvFactory(process.argv.slice(2));
import parent from 'glob-parent';
import scan from '../lib/scan';

/**
 * Setup
 */

const cycle: Function = (e: HTMLElement, newline: Boolean) => {
  process.stdout.write(`\u001b[G  ${e.target}${newline ? '\n' : ''}`);
};

function bench(name: String, options: Object): HTMLElement {
  const config: Object = { name, ...options };

  const suite: HTMLElement = new Suite(config);
  const add: Function = suite.add.bind(suite);
  suite.on('error', console.error);

  if (argv.run && name !== argv.run) {
    suite.add = () => suite;
    return suite;
  }

  console.log(`\n${red(config.name)}`);
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
}

bench('*.js')
  .add('picomatch.scan', () => scan('*.js'))
  .add('   glob-parent', () => parent('*.js'))
  .run();

bench('foo/bar/baz')
  .add('picomatch.scan', () => scan('foo/bar/baz'))
  .add('   glob-parent', () => parent('foo/bar/baz'))
  .run();

bench('foo/*.js')
  .add('picomatch.scan', () => scan('foo/*.js'))
  .add('   glob-parent', () => parent('foo/*.js'))
  .run();

bench('foo/{a,b}/*.js')
  .add('picomatch.scan', () => scan('foo/{a,b}/*.js'))
  .add('   glob-parent', () => parent('foo/{a,b}/*.js'))
  .run();

bench('*.js { parts: true, tokens: true }')
  .add('picomatch.scan', () => scan('*.js', { parts: true, tokens: true }))
  .add('   glob-parent', () => parent('*.js'))
  .run();

bench('foo/bar/baz { parts: true, tokens: true }')
  .add('picomatch.scan', () => scan('foo/bar/baz', { parts: true, tokens: true }))
  .add('   glob-parent', () => parent('foo/bar/baz'))
  .run();

bench('foo/*.js { parts: true, tokens: true }')
  .add('picomatch.scan', () => scan('foo/*.js', { parts: true, tokens: true }))
  .add('   glob-parent', () => parent('foo/*.js'))
  .run();

bench('foo/{a,b}/*.js { parts: true, tokens: true }')
  .add('picomatch.scan', () => scan('foo/{a,b}/*.js', { parts: true, tokens: true }))
  .add('   glob-parent', () => parent('foo/{a,b}/*.js'))
  .run();