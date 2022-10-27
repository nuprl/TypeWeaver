'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true,
};
