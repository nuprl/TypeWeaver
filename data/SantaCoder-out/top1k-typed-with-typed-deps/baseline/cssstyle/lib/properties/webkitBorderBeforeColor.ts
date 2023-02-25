'use strict';

var parseColor = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('-webkit-border-before-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true,
};