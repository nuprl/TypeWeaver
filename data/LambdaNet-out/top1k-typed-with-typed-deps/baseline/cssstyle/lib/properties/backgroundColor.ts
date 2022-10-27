'use strict';

var parsers: Array = require('../parsers');

var parse: Function = function parse(v: String): String {
  var parsed: String = parsers.parseColor(v);
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

module.exports.isValid = function isValid(v: Array): Boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: Array) {
    var parsed: String = parse(v);
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
