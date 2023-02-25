'use strict';

var parseMeasurement = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('bottom', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true,
};