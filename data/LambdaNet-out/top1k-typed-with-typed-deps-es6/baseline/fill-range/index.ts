/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

import util from 'util';
import toRegexRange from 'to-regex-range';

const isObject: Function = (val: Number) => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform: Function = (toNumber: Number) => {
  return (value: Number) => toNumber === true ? Number(value) : String(value);
};

const isValidValue: Function = (value: String) => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber: Function = (num: Number) => Number.isInteger(+num);

const zeros: Function = (input: String) => {
  let value: Array = `${input}`;
  let index: Number = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify: Function = (start: String, end: String, options: Array) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad: Function = (input: Array, maxLength: Number, toNumber: Number) => {
  if (maxLength > 0) {
    let dash: String = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen: Function = (input: String, maxLength: Number) => {
  let negative: String = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence: Function = (parts: Object, options: Map) => {
  parts.negatives.sort((a: Number, b: Number) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a: Number, b: Number) => a < b ? -1 : a > b ? 1 : 0);

  let prefix: String = options.capture ? '' : '?:';
  let positives: String = '';
  let negatives: String = '';
  let result: String;

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

const toRange: Function = (a: String, b: String, isNumbers: Boolean, options: Object) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start: String = String.fromCharCode(a);
  if (a === b) return start;

  let stop: String = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex: Function = (start: Array, end: Number, options: Map) => {
  if (Array.isArray(start)) {
    let wrap: Boolean = options.wrap === true;
    let prefix: String = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError: Function = (...args) => {
  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};

const invalidRange: Function = (start: String, end: String, options: Object) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep: Function = (step: String, options: Object) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers: Function = (start: Number, end: Number, step: Number = 1, options: Object = {}) => {
  let a: Number = Number(start);
  let b: Number = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending: Boolean = a > b;
  let startString: String = String(start);
  let endString: String = String(end);
  let stepString: String = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded: Boolean = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen: Number = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber: Number = padded === false && stringify(start, end, options) === false;
  let format: Function = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts: Object = { negatives: [], positives: [] };
  let push: Function = (num: Number) => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range: Array = [];
  let index: Number = 0;

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

const fillLetters: Function = (start: String, end: String, step: Number = 1, options: Object = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format: Function = options.transform || ((val: String) => String.fromCharCode(val));
  let a: Number = `${start}`.charCodeAt(0);
  let b: Number = `${end}`.charCodeAt(0);

  let descending: Boolean = a > b;
  let min: Number = Math.min(a, b);
  let max: Number = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range: Array = [];
  let index: Number = 0;

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

const fill: Function = (start: String, end: String, step: Number, options: Object = {}) => {
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

  let opts: Object = { ...options };
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

export default fill;
