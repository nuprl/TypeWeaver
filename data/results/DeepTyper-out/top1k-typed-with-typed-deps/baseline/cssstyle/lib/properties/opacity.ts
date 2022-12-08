'use strict';

var parseNumber: any = require('../parsers').parseNumber;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('opacity', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true,
};
