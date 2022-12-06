'use strict';

var implicitSetter: Function = require('../parsers').implicitSetter;

// the valid border-styles:
var styles: any[] = [
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

module.exports.isValid = function parse(v: string): boolean {
  return typeof v === 'string' && (v === '' || styles.indexOf(v) !== -1);
};
var isValid: Function = module.exports.isValid;

var parser: Function = function(v: string) {
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
