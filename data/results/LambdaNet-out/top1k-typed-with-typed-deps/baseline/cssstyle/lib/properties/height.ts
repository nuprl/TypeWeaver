'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

function parse(v: string): string {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }
  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }
  return parseMeasurement(v);
}

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('height', parse(v));
  },
  get: function() {
    return this.getPropertyValue('height');
  },
  enumerable: true,
  configurable: true,
};
