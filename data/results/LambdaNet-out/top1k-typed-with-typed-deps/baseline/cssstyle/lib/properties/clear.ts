'use strict';

var parseKeyword: Function = require('../parsers').parseKeyword;

var clear_keywords: any[] = ['none', 'left', 'right', 'both', 'inherit'];

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('clear', parseKeyword(v, clear_keywords));
  },
  get: function() {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true,
};
