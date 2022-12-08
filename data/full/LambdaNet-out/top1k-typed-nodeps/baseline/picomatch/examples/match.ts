'use strict';

const path: string = require('path');
// const assert = require('assert');
const pm: Function = require('..');

/**
 * Example function for matching an array of strings
 */

const match: Function = (list: any[], pattern: string, options: object = {}) => {
  let normalize: boolean = false;
  if (pattern.startsWith('./')) {
    pattern = pattern.slice(2);
    normalize = true;
  }

  const isMatch: Function = pm(pattern, options);
  const matches: Error = new Set();
  for (let ele of list) {
    if (normalize === true || options.normalize === true) {
      ele = path.posix.normalize(ele);
    }
    if (isMatch(ele)) {
      matches.add(options.onMatch ? options.onMatch(ele) : ele);
    }
  }
  return [...matches];
};

const fixtures: any[] = ['a.md', 'a/b.md', './a.md', './a/b.md', 'a/b/c.md', './a/b/c.md', '.\\a\\b\\c.md', 'a\\b\\c.md'];

console.log(path.posix.normalize('./{a,b,c}/*.md'));
console.log(match(fixtures, './**/*.md'));
// assert.deepEqual(match(fixtures, '**/*.md'), ['a.md', 'a/b.md', 'a/b/c.md', 'a\\b\\c.md']);
// assert.deepEqual(match(fixtures, '**/*.md', { normalize: true, unixify: false }), ['a.md', 'a/b.md', 'a/b/c.md', 'a\\b\\c.md']);
// assert.deepEqual(match(fixtures, '*.md'), ['a.md']);
// assert.deepEqual(match(fixtures, '*.md', { normalize: true, unixify: false }), ['a.md']);
// assert.deepEqual(match(fixtures, '*.md'), ['a.md']);
// assert.deepEqual(match(fixtures, '*/*.md', { normalize: true, unixify: false }), ['a/b.md']);
// assert.deepEqual(match(fixtures, '*/*.md'), ['a/b.md']);
// assert.deepEqual(match(fixtures, './**/*.md', { normalize: true, unixify: false }), ['a.md', 'a/b.md', 'a/b/c.md', 'a\\b\\c.md', './a.md', './a/b.md', '.\\a\\b\\c.md', 'a\\b\\c.md']);
// assert.deepEqual(match(fixtures, './**/*.md'), ['a.md', 'a/b.md', 'a/b/c.md']);
// assert.deepEqual(match(fixtures, './*.md', { normalize: true, unixify: false }), ['a.md', './a.md']);
// assert.deepEqual(match(fixtures, './*.md'), ['a.md']);
// assert.deepEqual(match(fixtures, './*/*.md', { normalize: true, unixify: false }), ['a/b.md', './a/b.md']);
// assert.deepEqual(match(fixtures, './*/*.md'), ['a/b.md']);
// assert.deepEqual(match(['./a'], 'a'), ['./a'], { normalize: true, unixify: false });
// assert.deepEqual(match(['./a'], 'a'), ['a']);
