'use strict';

var parsers: string = require('../parsers');
var implicitSetter: Function = require('../parsers').implicitSetter;

module.exports.isValid = function parse(v: string): boolean {
  if (typeof v !== 'string') {
    return false;
  }
  return (
    v === '' || v.toLowerCase() === 'transparent' || parsers.valueType(v) === parsers.TYPES.COLOR
  );
};
var isValid: Function = module.exports.isValid;

var parser: Function = function(v: string) {
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
