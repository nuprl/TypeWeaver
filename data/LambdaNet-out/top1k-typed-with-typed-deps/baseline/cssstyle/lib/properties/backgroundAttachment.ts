'use strict';

var parsers: String = require('../parsers');

var isValid: Function = (module.exports.isValid = function isValid(v: String): Boolean {
  return (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit')
  );
});

module.exports.definition = {
  set: function(v: String) {
    if (!isValid(v)) {
      return;
    }
    this._setProperty('background-attachment', v);
  },
  get: function() {
    return this.getPropertyValue('background-attachment');
  },
  enumerable: true,
  configurable: true,
};
