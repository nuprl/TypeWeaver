'use strict';

var parseMeasurement: any = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};
