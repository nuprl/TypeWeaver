'use strict';

var implicitSetter: any = require('../parsers').implicitSetter;

// the valid border-styles:
var styles: string[] = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

module.exports.isValid = function parse(v: any): any {
  return typeof v === 'string' && (v === '' || styles.indexOf(v) !== -1);
};
var isValid: string = module.exports.isValid;

var parser: any = function(v: any) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

module.exports.definition = {
  set: implicitSetter('border', 'style', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-style');
  },
  enumerable: true,
  configurable: true,
};
