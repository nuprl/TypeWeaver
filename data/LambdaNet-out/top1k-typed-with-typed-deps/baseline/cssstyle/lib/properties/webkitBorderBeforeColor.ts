'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('-webkit-border-before-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true,
};
