'use strict';

const picomatch: Function = require('..');

const fixtures: Array = [
  ['/file.d.ts', false],
  ['/file.ts', true],
  ['/file.d.something.ts', true],
  ['/file.dhello.ts', true]
];

const pattern: String = '/!(*.d).ts';
const isMatch: Function = picomatch(pattern);

console.log(fixtures.map((f: Promise) => [isMatch(f[0]), f[1]]));
