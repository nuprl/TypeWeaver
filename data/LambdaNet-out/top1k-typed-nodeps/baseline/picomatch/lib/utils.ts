'use strict';

const path: string = require('path');
const win32: boolean = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = require('./constants');

exports.isObject = (val: number) => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = (str: string) => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = (str: any[]) => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = (str: string) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = (str: string) => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = (str: string) => {
  return str.replace(REGEX_REMOVE_BACKSLASH, (match: number) => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs: any[] = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = (options: object) => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input: any[], char: string, lastIdx: number) => {
  const idx: number = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input: object, state: object = {}) => {
  let output: any[] = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input: HTMLElement, state: object = {}, options: object = {}) => {
  const prepend: string = options.contains ? '' : '^';
  const append: string = options.contains ? '' : '$';

  let output: string = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
