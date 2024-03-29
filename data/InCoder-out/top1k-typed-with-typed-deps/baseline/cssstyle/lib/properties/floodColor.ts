'use strict';

var parseColor = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('flood-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true,
};