'use strict';

var parsers: string = require('../parsers');

var isValid: Function = (module.exports.isValid = function isValid(v: string): boolean {
  return (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit')
  );
});

module.exports.definition = {
  set: function(v: string) {
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
