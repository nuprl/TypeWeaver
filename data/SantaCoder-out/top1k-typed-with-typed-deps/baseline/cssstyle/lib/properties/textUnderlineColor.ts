'use strict';

var parseColor = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('text-underline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true,
};