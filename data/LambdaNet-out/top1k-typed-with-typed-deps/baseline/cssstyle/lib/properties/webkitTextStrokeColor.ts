'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('-webkit-text-stroke-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-text-stroke-color');
  },
  enumerable: true,
  configurable: true,
};
