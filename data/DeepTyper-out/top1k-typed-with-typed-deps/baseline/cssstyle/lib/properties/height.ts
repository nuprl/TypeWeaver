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

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('height', parse(v));
  },
  get: function() {
    return this.getPropertyValue('height');
  },
  enumerable: true,
  configurable: true,
};
