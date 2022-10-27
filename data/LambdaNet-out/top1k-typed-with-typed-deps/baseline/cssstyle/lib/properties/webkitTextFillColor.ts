'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('-webkit-text-fill-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-text-fill-color');
  },
  enumerable: true,
  configurable: true,
};
