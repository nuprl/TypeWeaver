'use strict';

import parsers from '../parsers';
import { implicitSetter } from '../parsers';

export const isValid = function parse(v) {
  if (typeof v !== 'string') {
    return false;
  }
  return (
    v === '' || v.toLowerCase() === 'transparent' || parsers.valueType(v) === parsers.TYPES.COLOR
  );
};

var isValid = module.exports.isValid;

var parser = function(v) {
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

export const definition = {
  set: implicitSetter('border', 'color', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-color');
  },
  enumerable: true,
  configurable: true,
};
