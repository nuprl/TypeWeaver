'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('left', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true,
};
