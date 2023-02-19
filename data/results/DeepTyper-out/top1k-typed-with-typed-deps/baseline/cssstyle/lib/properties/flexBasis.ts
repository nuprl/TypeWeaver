'use strict';

var parseMeasurement: any = require('../parsers').parseMeasurement;

function parse(v: any): any {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }
  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }
  return parseMeasurement(v);
}

module.exports.isValid = function isValid(v: any): boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('flex-basis', parse(v));
  },
  get: function() {
    return this.getPropertyValue('flex-basis');
  },
  enumerable: true,
  configurable: true,
};
