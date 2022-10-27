'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('lighting-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('lighting-color');
  },
  enumerable: true,
  configurable: true,
};
