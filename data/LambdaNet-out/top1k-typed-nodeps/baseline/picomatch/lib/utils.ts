'use strict';

const path: String = require('path');
const win32: Boolean = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = require('./constants');

exports.isObject = (val: Number) => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = (str: String) => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = (str: Array) => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = (str: String) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = (str: String) => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = (str: String) => {
  return str.replace(REGEX_REMOVE_BACKSLASH, (match: Number) => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs: Array = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = (options: Object) => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input: Array, char: String, lastIdx: Number) => {
  const idx: Number = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input: Object, state: Object = {}) => {
  let output: Array = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input: HTMLElement, state: Object = {}, options: Object = {}) => {
  const prepend: String = options.contains ? '' : '^';
  const append: String = options.contains ? '' : '$';

  let output: String = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
