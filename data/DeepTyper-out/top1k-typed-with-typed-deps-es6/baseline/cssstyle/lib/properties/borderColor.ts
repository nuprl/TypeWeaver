'use strict';

import parsers from '../parsers';
import { implicitSetter } from '../parsers';

export const isValid: boolean = function parse(v: any): boolean {
  if (typeof v !== 'string') {
    return false;
  }
  return (
    v === '' || v.toLowerCase() === 'transparent' || parsers.valueType(v) === parsers.TYPES.COLOR
  );
};

var isValid: boolean = module.exports.isValid;

var parser: any = function(v: string) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

export const definition: any = {
  set: implicitSetter('border', 'color', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-color');
  },
  enumerable: true,
  configurable: true,
};
