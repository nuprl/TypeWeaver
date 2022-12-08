'use strict';

var parseNumber = require('../parsers').parseNumber;

module.exports.definition = {
  set: function(v: number) {
    this._setProperty('opacity', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true,
};