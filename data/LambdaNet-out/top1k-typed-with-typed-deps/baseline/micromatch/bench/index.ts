'use strict';

const { Suite } = require('benchmark');
const { green } = require('ansi-colors');
const argv: Object = require('minimist')(process.argv.slice(2));
const mm: HTMLElement = require('minimatch');
const mi: HTMLElement = require('..');

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

bench(green('.makeRe') + ' star')
  .add('micromatch', () => mi.makeRe('*'))
  .add('minimatch', () => mm.makeRe('*'))
  .run();

bench(green('.makeRe') + ' star; dot=true')
  .add('micromatch', () => mi.makeRe('*', { dot: true }))
  .add('minimatch', () => mm.makeRe('*', { dot: true }))
  .run();

bench(green('.makeRe') + ' globstar')
  .add('micromatch', () => mi.makeRe('**'))
  .add('minimatch', () => mm.makeRe('**'))
  .run();

bench(green('.makeRe') + ' globstars')
  .add('micromatch', () => mi.makeRe('**/**/**'))
  .add('minimatch', () => mm.makeRe('**/**/**'))
  .run();

bench(green('.makeRe') + ' with leading star')
  .add('micromatch', () => mi.makeRe('*.txt'))
  .add('minimatch', () => mm.makeRe('*.txt'))
  .run();

bench(green('.makeRe') + ' - braces')
  .add('micromatch', () => mi.makeRe('{a,b,c}*.txt'))
  .add('minimatch', () => mm.makeRe('{a,b,c}*.txt'))
  .run();

bench(green('.makeRe') + ' braces - range (expanded)')
  .add('micromatch', () => mi.braces('foo/{1..250}/bar', { expand: true }))
  .add('minimatch', () => mm.braceExpand('foo/{1..250}/bar'))
  .run();

bench(green('.makeRe') + ' braces - range (compiled)')
  .add('micromatch', () => mi.makeRe('foo/{1..250}/bar'))
  .add('minimatch', () => mm.makeRe('foo/{1..250}/bar'))
  .run();

bench(green('.makeRe') + ' braces - nested ranges (expanded)')
  .add('micromatch', () => mi.braces('foo/{a,b,{1..250}}/bar', { expand: true }))
  .add('minimatch', () => mm.braceExpand('foo/{a,b,{1..250}}/bar'))
  .run();

bench(green('.makeRe') + ' braces - nested ranges (compiled)')
  .add('micromatch', () => mi.makeRe('foo/{a,b,{1..250}}/bar'))
  .add('minimatch', () => mm.makeRe('foo/{a,b,{1..250}}/bar'))
  .run();

bench(green('.makeRe') + ' braces - set (compiled)')
  .add('micromatch', () => mi.makeRe('foo/{a,b,c,d,e}/bar'))
  .add('minimatch', () => mm.makeRe('foo/{a,b,c,d,e}/bar'))
  .run();

bench(green('.makeRe') + ' braces - nested sets (compiled)')
  .add('micromatch', () => mi.makeRe('foo/{a,b,c,d,e,{x,y,z}}/bar'))
  .add('minimatch', () => mm.makeRe('foo/{a,b,c,d,e,{x,y,z}}/bar'))
  .run();
