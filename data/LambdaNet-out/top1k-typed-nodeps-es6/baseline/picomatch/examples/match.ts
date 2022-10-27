'use strict';

import path from 'path';

// const assert = require('assert');
import pm from '..';

/**
 * Example function for matching an array of strings
 */

const match: Function = (list: Array, pattern: String, options: Object = {}) => {
  let normalize: Boolean = false;
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

const fixtures: Array = ['a.md', 'a/b.md', './a.md', './a/b.md', 'a/b/c.md', './a/b/c.md', '.\\a\\b\\c.md', 'a\\b\\c.md'];

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
