'use strict';

var parsers: Array = require('../parsers');

var parse: Function = function parse(v: String): String {
  var parsed: Number = parsers.parseUrl(v);
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

module.exports.isValid = function isValid(v: Array): Boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: Array) {
    this._setProperty('background-image', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true,
};
