'use strict';

import parsers from '../parsers';

var parse = function parse(v: any) {
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

export const isValid = function isValid(v: ny) {
  return parse(v) !== undefined;
};

export const definition = {
  set: function(v: any) {
    this._setProperty('background-repeat', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-repeat');
  },
  enumerable: true,
  configurable: true,
};