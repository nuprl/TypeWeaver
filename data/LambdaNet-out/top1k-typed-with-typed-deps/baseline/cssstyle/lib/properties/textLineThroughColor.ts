'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('text-line-through-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-line-through-color');
  },
  enumerable: true,
  configurable: true,
};
