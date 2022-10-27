'use strict';

var parsers: String = require('../parsers');

var parse: Function = function parse(v: String): String {
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'repeat' ||
      v.toLowerCase() === 'repeat-x' ||
      v.toLowerCase() === 'repeat-y' ||
      v.toLowerCase() === 'no-repeat' ||
      v.toLowerCase() === 'inherit')
  ) {
    return v;
  }
  return undefined;
};

module.exports.isValid = function isValid(v: Array): Boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: Array) {
    this._setProperty('background-repeat', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-repeat');
  },
  enumerable: true,
  configurable: true,
};
