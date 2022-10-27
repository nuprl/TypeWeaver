'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

function parse(v: String): String {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }
  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }
  return parseMeasurement(v);
}

module.exports.isValid = function isValid(v: String): Boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('flex-basis', parse(v));
  },
  get: function() {
    return this.getPropertyValue('flex-basis');
  },
  enumerable: true,
  configurable: true,
};
