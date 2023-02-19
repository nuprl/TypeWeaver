/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const util: string = require('util');
const toRegexRange: Function = require('to-regex-range');

const isObject: Function = (val: number) => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform: Function = (toNumber: number) => {
  return (value: number) => toNumber === true ? Number(value) : String(value);
};

const isValidValue: Function = (value: string) => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber: Function = (num: number) => Number.isInteger(+num);

const zeros: Function = (input: string) => {
  let value: any[] = `${input}`;
  let index: number = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify: Function = (start: string, end: string, options: any[]) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad: Function = (input: any[], maxLength: number, toNumber: number) => {
  if (maxLength > 0) {
    let dash: string = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen: Function = (input: string, maxLength: number) => {
  let negative: string = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence: Function = (parts: object, options: Map) => {
  parts.negatives.sort((a: number, b: number) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a: number, b: number) => a < b ? -1 : a > b ? 1 : 0);

  let prefix: string = options.capture ? '' : '?:';
  let positives: string = '';
  let negatives: string = '';
  let result: string;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange: Function = (a: string, b: string, isNumbers: boolean, options: object) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start: string = String.fromCharCode(a);
  if (a === b) return start;

  let stop: string = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex: Function = (start: any[], end: string, options: Map) => {
  if (Array.isArray(start)) {
    let wrap: boolean = options.wrap === true;
    let prefix: string = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError: Function = (...args) => {
  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};

const invalidRange: Function = (start: string, end: string, options: object) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep: Function = (step: string, options: object) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers: Function = (start: number, end: number, step: number = 1, options: object = {}) => {
  let a: number = Number(start);
  let b: number = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending: boolean = a > b;
  let startString: string = String(start);
  let endString: string = String(end);
  let stepString: string = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded: boolean = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen: number = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber: number = padded === false && stringify(start, end, options) === false;
  let format: Function = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts: object = { negatives: [], positives: [] };
  let push: Function = (num: number) => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range: any[] = [];
  let index: number = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters: Function = (start: string, end: string, step: number = 1, options: object = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format: Function = options.transform || ((val: string) => String.fromCharCode(val));
  let a: number = `${start}`.charCodeAt(0);
  let b: number = `${end}`.charCodeAt(0);

  let descending: boolean = a > b;
  let min: number = Math.min(a, b);
  let max: number = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range: any[] = [];
  let index: number = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill: Function = (start: string, end: string, step: number, options: object = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill(start, end, 1, { transform: step });
  }

  if (isObject(step)) {
    return fill(start, end, 0, step);
  }

  let opts: object = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber(step)) {
    if (step != null && !isObject(step)) return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }

  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

module.exports = fill;
