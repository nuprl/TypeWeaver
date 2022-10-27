'use strict';

var parseKeyword: any = require('../parsers').parseKeyword;

var clear_keywords: string[] = ['none', 'left', 'right', 'both', 'inherit'];

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('clear', parseKeyword(v, clear_keywords));
  },
  get: function() {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true,
};
