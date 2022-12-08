'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const picomatch: any = require('picomatch');
const normalizePath: any = require('normalize-path');

/**
 * @typedef {(testString: string) => boolean} AnymatchFn
 * @typedef {string|RegExp|AnymatchFn} AnymatchPattern
 * @typedef {AnymatchPattern|AnymatchPattern[]} AnymatchMatcher
 */
const BANG: RegExp = '!';
const DEFAULT_OPTIONS: IChunkifyOptions = {returnIndex: false};
const arrify: any = (item: any) => Array.isArray(item) ? item : [item];

/**
 * @param {AnymatchPattern} matcher
 * @param {object} options
 * @returns {AnymatchFn}
 */
const createPattern: any = (matcher: any, options: any) => {
  if (typeof matcher === 'function') {
    return matcher;
  }
  if (typeof matcher === 'string') {
    const glob: any = picomatch(matcher, options);
    return (string) => matcher === string || glob(string);
  }
  if (matcher instanceof RegExp) {
    return (string) => matcher.test(string);
  }
  return (string) => false;
};

/**
 * @param {Array<Function>} patterns
 * @param {Array<Function>} negPatterns
 * @param {String|Array} args
 * @param {Boolean} returnIndex
 * @returns {boolean|number}
 */
const matchPatterns: any = (patterns: string[], negPatterns: any, args: any, returnIndex: any) => {
  const isList: any = Array.isArray(args);
  const _path: any = isList ? args[0] : args;
  if (!isList && typeof _path !== 'string') {
    throw new TypeError('anymatch: second argument must be a string: got ' +
      Object.prototype.toString.call(_path))
  }
  const path: any = normalizePath(_path);

  for (let index = 0; index < negPatterns.length; index++) {
    const nglob: any = negPatterns[index];
    if (nglob(path)) {
      return returnIndex ? -1 : false;
    }
  }

  const applied: any = isList && [path].concat(args.slice(1));
  for (let index = 0; index < patterns.length; index++) {
    const pattern: string = patterns[index];
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
const anymatch: any = (matchers, testString, options = DEFAULT_OPTIONS) => {
  if (matchers == null) {
    throw new TypeError('anymatch: specify first argument');
  }
  const opts: any = typeof options === 'boolean' ? {returnIndex: options} : options;
  const returnIndex: boolean = opts.returnIndex || false;

  // Early cache for matchers.
  const mtchers: boolean = arrify(matchers);
  const negatedGlobs: any = mtchers
    .filter((item: any) => typeof item === 'string' && item.charAt(0) === BANG)
    .map((item: any) => item.slice(1))
    .map((item: any) => picomatch(item, opts));
  const patterns: string[] = mtchers
    .filter((item: any) => typeof item !== 'string' || (typeof item === 'string' && item.charAt(0) !== BANG))
    .map((matcher: any) => createPattern(matcher, opts));

  if (testString == null) {
    return (testString, ri = false) => {
      const returnIndex: boolean = typeof ri === 'boolean' ? ri : false;
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    }
  }

  return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
};

anymatch.default = anymatch;
module.exports = anymatch;
