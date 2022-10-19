'use strict';

import { implicitSetter } from '../parsers';

// the valid border-styles:
var styles = [
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

export const isValid = function parse(v) {
  return typeof v === 'string' && (v === '' || styles.indexOf(v) !== -1);
};

var isValid = module.exports.isValid;

var parser = function(v) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

export const definition = {
  set: implicitSetter('border', 'style', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-style');
  },
  enumerable: true,
  configurable: true,
};
