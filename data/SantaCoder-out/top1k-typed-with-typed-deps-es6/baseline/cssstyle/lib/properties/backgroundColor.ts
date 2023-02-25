'use strict';

import parsers from '../parsers';

var parse = function parse(v: string) {
  var parsed = parsers.parseColor(v);
  if (parsed !== undefined) {
    return parsed;
  }
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'transparent' || v.toLowerCase() === 'inherit')
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
    var parsed = parse(v);
    if (parsed === undefined) {
      return;
    }
    this._setProperty('background-color', parsed);
  },
  get: function() {
    return this.getPropertyValue('background-color');
  },
  enumerable: true,
  configurable: true,
};