'use strict';
module.exports = {
  wrap: wrapRange,
  limit: limitRange,
  validate: validateRange,
  test: testRange,
  curry: curry,
  name: name
};

function wrapRange(min: number, max: number, value: number) {
  var maxLessMin = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

function limitRange(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}

function validateRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number) {
  if (!testRange(min, max, value, minExclusive, maxExclusive)) {
    throw new Error(value + ' is outside of range [' + min + ',' + max + ')');
  }
  return value;
}

function testRange(min: number, max: number, value: number, minExclusive: number, maxExclusive: number) {
  return !(
       value < min ||
       value > max ||
       (maxExclusive && (value === max)) ||
       (minExclusive && (value === min))
  );
}

function name(min: number, max: number, minExcl: number, maxExcl: number) {
  return (minExcl ? '(' : '[') + min + ',' + max + (maxExcl ? ')' : ']');
}

function curry(min: number, max: number, minExclusive: boolean, maxExclusive: number) {
  var boundNameFn = name.bind(null, min, max, minExclusive, maxExclusive);
  return {
    wrap: wrapRange.bind(null, min, max),
    limit: limitRange.bind(null, min, max),
    validate: function(value: any) {
      return validateRange(min, max, value, minExclusive, maxExclusive);
    },
    test: function(value: any) {
      return testRange(min, max, value, minExclusive, maxExclusive);
    },
    toString: boundNameFn,
    name: boundNameFn
  };
}