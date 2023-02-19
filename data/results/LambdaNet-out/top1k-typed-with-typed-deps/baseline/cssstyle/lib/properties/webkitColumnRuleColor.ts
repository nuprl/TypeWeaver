'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('-webkit-column-rule-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-column-rule-color');
  },
  enumerable: true,
  configurable: true,
};
