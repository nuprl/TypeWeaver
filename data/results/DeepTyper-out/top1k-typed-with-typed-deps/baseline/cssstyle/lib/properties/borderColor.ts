'use strict';

var parsers: any = require('../parsers');
var implicitSetter: any = require('../parsers').implicitSetter;

module.exports.isValid = function parse(v: any): any {
  if (typeof v !== 'string') {
    return false;
  }
  return (
    v === '' || v.toLowerCase() === 'transparent' || parsers.valueType(v) === parsers.TYPES.COLOR
  );
};
var isValid: boolean = module.exports.isValid;

var parser: string = function(v: string) {
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
