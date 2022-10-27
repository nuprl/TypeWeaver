'use strict';

import parsers from '../parsers';

var parse: Function = function parse(v: String): String {
  var parsed: Number = parsers.parseColor(v);
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

export const isValid: String = function isValid(v: Array): Boolean {
  return parse(v) !== undefined;
};

export const definition: Object = {
  set: function(v: Array) {
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
