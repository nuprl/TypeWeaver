'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('text-overline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-overline-color');
  },
  enumerable: true,
  configurable: true,
};
