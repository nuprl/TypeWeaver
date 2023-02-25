'use strict';

import parsers from '../parsers';

var parse = function parse(v: string) {
  var parsed = parsers.parseUrl(v);
  if (parsed !== undefined) {
    return parsed;
  }
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'none' || v.toLowerCase() === 'inherit')
  ) {
    return v;
  }
  return undefined;
};

export const isValid = function isValid(v: string) {
  return parse(v) !== undefined;
};

export const definition = {
  set: function(v: string) {
    this._setProperty('background-image', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true,
};