'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('text-underline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true,
};
