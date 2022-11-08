'use strict';

var parseColor = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true,
};