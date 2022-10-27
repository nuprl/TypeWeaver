'use strict';

var parseKeyword: Function = require('../parsers').parseKeyword;

var clear_keywords: Array = ['none', 'left', 'right', 'both', 'inherit'];

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('clear', parseKeyword(v, clear_keywords));
  },
  get: function() {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true,
};
