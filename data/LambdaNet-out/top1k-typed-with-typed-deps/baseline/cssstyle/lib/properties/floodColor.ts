'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('flood-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true,
};
