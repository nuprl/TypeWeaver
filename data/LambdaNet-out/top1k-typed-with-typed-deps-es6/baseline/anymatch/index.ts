'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

import picomatch from 'picomatch';
import normalizePath from 'normalize-path';

/**
 * @typedef {(testString: string) => boolean} AnymatchFn
 * @typedef {string|RegExp|AnymatchFn} AnymatchPattern
 * @typedef {AnymatchPattern|AnymatchPattern[]} AnymatchMatcher
 */
const BANG: String = '!';
const DEFAULT_OPTIONS: Object = {returnIndex: false};
const arrify: Function = (item: Array) => Array.isArray(item) ? item : [item];

/**
 * @param {AnymatchPattern} matcher
 * @param {object} options
 * @returns {AnymatchFn}
 */
const createPattern: Function = (matcher: Function, options: Object) => {
  if (typeof matcher === 'function') {
    return matcher;
  }
  if (typeof matcher === 'string') {
    const glob: Function = picomatch(matcher, options);
    return (string: String) => matcher === string || glob(string);
  }
  if (matcher instanceof RegExp) {
    return (string: String) => matcher.test(string);
  }
  return (string: String) => false;
};

/**
 * @param {Array<Function>} patterns
 * @param {Array<Function>} negPatterns
 * @param {String|Array} args
 * @param {Boolean} returnIndex
 * @returns {boolean|number}
 */
const matchPatterns: Function = (patterns: Array, negPatterns: Array, args: Array, returnIndex: Boolean) => {
  const isList: Boolean = Array.isArray(args);
  const _path: String = isList ? args[0] : args;
  if (!isList && typeof _path !== 'string') {
    throw new TypeError('anymatch: second argument must be a string: got ' +
      Object.prototype.toString.call(_path))
  }
  const path: String = normalizePath(_path);

  for (let index = 0; index < negPatterns.length; index++) {
    const nglob: Function = negPatterns[index];
    if (nglob(path)) {
      return returnIndex ? -1 : false;
    }
  }

  const applied: Array = isList && [path].concat(args.slice(1));
  for (let index = 0; index < patterns.length; index++) {
    const pattern: Function = patterns[index];
    if (isList ? pattern(...applied) : pattern(path)) {
      return returnIndex ? index : true;
    }
  }

  return returnIndex ? -1 : false;
};

/**
 * @param {AnymatchMatcher} matchers
 * @param {Array|string} testString
 * @param {object} options
 * @returns {boolean|number|Function}
 */
const anymatch: Function = (matchers: String, testString: String, options: Boolean = DEFAULT_OPTIONS) => {
  if (matchers == null) {
    throw new TypeError('anymatch: specify first argument');
  }
  const opts: Object = typeof options === 'boolean' ? {returnIndex: options} : options;
  const returnIndex: Boolean = opts.returnIndex || false;

  // Early cache for matchers.
  const mtchers: Array = arrify(matchers);
  const negatedGlobs: Array = mtchers
    .filter((item: String) => typeof item === 'string' && item.charAt(0) === BANG)
    .map((item: Array) => item.slice(1))
    .map((item: String) => picomatch(item, opts));
  const patterns: Array = mtchers
    .filter((item: String) => typeof item !== 'string' || (typeof item === 'string' && item.charAt(0) !== BANG))
    .map((matcher: String) => createPattern(matcher, opts));

  if (testString == null) {
    return (testString: String, ri: Number = false) => {
      const returnIndex: Boolean = typeof ri === 'boolean' ? ri : false;
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    }
  }

  return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
};

anymatch.default = anymatch;
export default anymatch;
