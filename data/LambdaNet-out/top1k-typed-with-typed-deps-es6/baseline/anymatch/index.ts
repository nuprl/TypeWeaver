'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

import picomatch from 'picomatch';
import normalizePath from 'normalize-path';

/**
 * @typedef {(testString: string) => boolean} AnymatchFn
 * @typedef {string|RegExp|AnymatchFn} AnymatchPattern
 * @typedef {AnymatchPattern|AnymatchPattern[]} AnymatchMatcher
 */
const BANG: string = '!';
const DEFAULT_OPTIONS: object = {returnIndex: false};
const arrify: Function = (item: any[]) => Array.isArray(item) ? item : [item];

/**
 * @param {AnymatchPattern} matcher
 * @param {object} options
 * @returns {AnymatchFn}
 */
const createPattern: Function = (matcher: Function, options: object) => {
  if (typeof matcher === 'function') {
    return matcher;
  }
  if (typeof matcher === 'string') {
    const glob: Function = picomatch(matcher, options);
    return (string: string) => matcher === string || glob(string);
  }
  if (matcher instanceof RegExp) {
    return (string: string) => matcher.test(string);
  }
  return (string: string) => false;
};

/**
 * @param {Array<Function>} patterns
 * @param {Array<Function>} negPatterns
 * @param {String|Array} args
 * @param {Boolean} returnIndex
 * @returns {boolean|number}
 */
const matchPatterns: Function = (patterns: any[], negPatterns: any[], args: any[], returnIndex: boolean) => {
  const isList: boolean = Array.isArray(args);
  const _path: string = isList ? args[0] : args;
  if (!isList && typeof _path !== 'string') {
    throw new TypeError('anymatch: second argument must be a string: got ' +
      Object.prototype.toString.call(_path))
  }
  const path: string = normalizePath(_path);

  for (let index = 0; index < negPatterns.length; index++) {
    const nglob: Function = negPatterns[index];
    if (nglob(path)) {
      return returnIndex ? -1 : false;
    }
  }

  const applied: any[] = isList && [path].concat(args.slice(1));
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
const anymatch: Function = (matchers: string, testString: string, options: boolean = DEFAULT_OPTIONS) => {
  if (matchers == null) {
    throw new TypeError('anymatch: specify first argument');
  }
  const opts: object = typeof options === 'boolean' ? {returnIndex: options} : options;
  const returnIndex: boolean = opts.returnIndex || false;

  // Early cache for matchers.
  const mtchers: any[] = arrify(matchers);
  const negatedGlobs: any[] = mtchers
    .filter((item: string) => typeof item === 'string' && item.charAt(0) === BANG)
    .map((item: any[]) => item.slice(1))
    .map((item: string) => picomatch(item, opts));
  const patterns: any[] = mtchers
    .filter((item: string) => typeof item !== 'string' || (typeof item === 'string' && item.charAt(0) !== BANG))
    .map((matcher: string) => createPattern(matcher, opts));

  if (testString == null) {
    return (testString: string, ri: number = false) => {
      const returnIndex: boolean = typeof ri === 'boolean' ? ri : false;
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    }
  }

  return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
};

anymatch.default = anymatch;
export default anymatch;
