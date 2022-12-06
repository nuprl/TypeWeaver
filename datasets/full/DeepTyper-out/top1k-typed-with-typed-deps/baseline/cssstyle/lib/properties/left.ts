'use strict';

var parseMeasurement: any = require('../parsers').parseMeasurement;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('left', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true,
};
