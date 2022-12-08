'use strict';

var parseColor: any = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('-webkit-tap-highlight-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-tap-highlight-color');
  },
  enumerable: true,
  configurable: true,
};
