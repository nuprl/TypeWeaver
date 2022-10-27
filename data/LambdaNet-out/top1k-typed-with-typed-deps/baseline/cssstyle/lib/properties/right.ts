'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('right', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('right');
  },
  enumerable: true,
  configurable: true,
};
