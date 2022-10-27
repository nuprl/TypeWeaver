'use strict';

var parsers: String = require('../parsers');
var implicitSetter: Function = require('../parsers').implicitSetter;

module.exports.isValid = function parse(v: String): Boolean {
  if (typeof v !== 'string') {
    return false;
  }
  return (
    v === '' || v.toLowerCase() === 'transparent' || parsers.valueType(v) === parsers.TYPES.COLOR
  );
};
var isValid: Function = module.exports.isValid;

var parser: Function = function(v: String) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

module.exports.definition = {
  set: implicitSetter('border', 'color', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-color');
  },
  enumerable: true,
  configurable: true,
};
