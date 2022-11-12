'use strict';
module.exports = {
  wrap: wrapRange,
  limit: limitRange,
  validate: validateRange,
  test: testRange,
  curry: curry,
  name: name
};

function wrapRange(min: Number, max: Number, value: Number): String {
  var maxLessMin: Number = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

function limitRange(min: Number, max: Number, value: Number): Number {
  return Math.max(min, Math.min(max, value));
}

function validateRange(min: String, max: String, value: String, minExclusive: Number, maxExclusive: String): String {
  if (!testRange(min, max, value, minExclusive, maxExclusive)) {
    throw new Error(value + ' is outside of range [' + min + ',' + max + ')');
  }
  return value;
}

function testRange(min: Number, max: Number, value: Number, minExclusive: Boolean, maxExclusive: Boolean): Boolean {
  return !(
       value < min ||
       value > max ||
       (maxExclusive && (value === max)) ||
       (minExclusive && (value === min))
  );
}

function name(min: String, max: Number, minExcl: Boolean, maxExcl: Boolean): String {
  return (minExcl ? '(' : '[') + min + ',' + max + (maxExcl ? ')' : ']');
}

function curry(min: String, max: String, minExclusive: String, maxExclusive: String): Object {
  var boundNameFn: String = name.bind(null, min, max, minExclusive, maxExclusive);
  return {
    wrap: wrapRange.bind(null, min, max),
    limit: limitRange.bind(null, min, max),
    validate: function(value: String) {
      return validateRange(min, max, value, minExclusive, maxExclusive);
    },
    test: function(value: String) {
      return testRange(min, max, value, minExclusive, maxExclusive);
    },
    toString: boundNameFn,
    name: boundNameFn
  };
}
