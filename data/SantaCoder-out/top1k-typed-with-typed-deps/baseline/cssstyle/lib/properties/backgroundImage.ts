'use strict';

var parsers = require('../parsers');

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

module.exports.isValid = function isValid(v: string) {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('background-image', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true,
};