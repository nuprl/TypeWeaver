'use strict';

import path from 'path';
const win32: boolean = process.platform === 'win32';

import {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL,
} from './constants';

export const isObject: Function = (val: number) => val !== null && typeof val === 'object' && !Array.isArray(val);
export const hasRegexChars: Function = (str: string) => REGEX_SPECIAL_CHARS.test(str);
export const isRegexChar: Function = (str: any[]) => str.length === 1 && hasRegexChars(str);
export const escapeRegex: Function = (str: string) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
export const toPosixSlashes: Function = (str: string) => str.replace(REGEX_BACKSLASH, '/');

export const removeBackslashes: Function = (str: string) => {
  return str.replace(REGEX_REMOVE_BACKSLASH, (match: number) => {
    return match === '\\' ? '' : match;
  });
};

export const supportsLookbehinds: Function = () => {
  const segs: any[] = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

export const isWindows: Function = (options: object) => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

export const escapeLast: Function = (input: any[], char: string, lastIdx: number) => {
  const idx: number = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

export const removePrefix: Function = (input: object, state: object = {}) => {
  let output: any[] = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

export const wrapOutput: Function = (input: HTMLElement, state: object = {}, options: object = {}) => {
  const prepend: string = options.contains ? '' : '^';
  const append: string = options.contains ? '' : '$';

  let output: string = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
