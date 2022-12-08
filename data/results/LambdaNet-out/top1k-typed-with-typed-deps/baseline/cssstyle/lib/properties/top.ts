'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};
