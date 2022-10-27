'use strict';

import path from 'path';
const win32: Boolean = process.platform === 'win32';

import {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL,
} from './constants';

export const isObject: Function = (val: Number) => val !== null && typeof val === 'object' && !Array.isArray(val);
export const hasRegexChars: Function = (str: String) => REGEX_SPECIAL_CHARS.test(str);
export const isRegexChar: Function = (str: Array) => str.length === 1 && hasRegexChars(str);
export const escapeRegex: Function = (str: String) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
export const toPosixSlashes: Function = (str: String) => str.replace(REGEX_BACKSLASH, '/');

export const removeBackslashes: Function = (str: String) => {
  return str.replace(REGEX_REMOVE_BACKSLASH, (match: Number) => {
    return match === '\\' ? '' : match;
  });
};

export const supportsLookbehinds: Function = () => {
  const segs: Array = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

export const isWindows: Function = (options: Object) => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

export const escapeLast: Function = (input: Array, char: String, lastIdx: Number) => {
  const idx: Number = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

export const removePrefix: Function = (input: Object, state: Object = {}) => {
  let output: Array = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

export const wrapOutput: Function = (input: HTMLElement, state: Object = {}, options: Object = {}) => {
  const prepend: String = options.contains ? '' : '^';
  const append: String = options.contains ? '' : '$';

  let output: String = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
