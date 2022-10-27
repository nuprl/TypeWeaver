'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('outline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('outline-color');
  },
  enumerable: true,
  configurable: true,
};
