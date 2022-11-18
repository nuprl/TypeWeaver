'use strict';

var parsers: string = require('../parsers');

var parse: Function = function parse(v: string): string {
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'collapse' ||
      v.toLowerCase() === 'separate' ||
      v.toLowerCase() === 'inherit')
  ) {
    return v;
  }
  return undefined;
};

module.exports.definition = {
  set: function(v: any[]) {
    this._setProperty('border-collapse', parse(v));
  },
  get: function() {
    return this.getPropertyValue('border-collapse');
  },
  enumerable: true,
  configurable: true,
};
