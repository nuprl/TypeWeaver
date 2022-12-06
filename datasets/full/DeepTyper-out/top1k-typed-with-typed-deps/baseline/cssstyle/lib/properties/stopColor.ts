'use strict';

var parseColor: any = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('stop-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('stop-color');
  },
  enumerable: true,
  configurable: true,
};
