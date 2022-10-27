'use strict';

var parseNumber: Function = require('../parsers').parseNumber;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('opacity', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true,
};
