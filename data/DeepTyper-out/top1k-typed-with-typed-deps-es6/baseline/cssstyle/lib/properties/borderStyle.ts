'use strict';

import { implicitSetter } from '../parsers';

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

export const isValid: boolean = function parse(v: any): boolean {
  return typeof v === 'string' && (v === '' || styles.indexOf(v) !== -1);
};

var isValid: boolean = module.exports.isValid;

var parser: any = function(v: any) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

export const definition: any = {
  set: implicitSetter('border', 'style', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-style');
  },
  enumerable: true,
  configurable: true,
};
