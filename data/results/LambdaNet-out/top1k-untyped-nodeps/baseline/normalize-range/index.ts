'use strict';
module.exports = {
  wrap: wrapRange,
  limit: limitRange,
  validate: validateRange,
  test: testRange,
  curry: curry,
  name: name
};

function wrapRange(min: number, max: number, value: number): string {
  var maxLessMin: number = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

function limitRange(min: number, max: number, value: number): number {
  return Math.max(min, Math.min(max, value));
}

function validateRange(min: string, max: string, value: string, minExclusive: number, maxExclusive: string): string {
  if (!testRange(min, max, value, minExclusive, maxExclusive)) {
    throw new Error(value + ' is outside of range [' + min + ',' + max + ')');
  }
  return value;
}

function testRange(min: number, max: number, value: number, minExclusive: boolean, maxExclusive: boolean): boolean {
  return !(
       value < min ||
       value > max ||
       (maxExclusive && (value === max)) ||
       (minExclusive && (value === min))
  );
}

function name(min: string, max: number, minExcl: boolean, maxExcl: boolean): string {
  return (minExcl ? '(' : '[') + min + ',' + max + (maxExcl ? ')' : ']');
}

function curry(min: string, max: string, minExclusive: string, maxExclusive: string): object {
  var boundNameFn: string = name.bind(null, min, max, minExclusive, maxExclusive);
  return {
    wrap: wrapRange.bind(null, min, max),
    limit: limitRange.bind(null, min, max),
    validate: function(value: string) {
      return validateRange(min, max, value, minExclusive, maxExclusive);
    },
    test: function(value: string) {
      return testRange(min, max, value, minExclusive, maxExclusive);
    },
    toString: boundNameFn,
    name: boundNameFn
  };
}
