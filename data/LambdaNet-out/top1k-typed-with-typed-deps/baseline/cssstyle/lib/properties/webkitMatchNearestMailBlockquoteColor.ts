'use strict';

var parseColor: Function = require('../parsers').parseColor;

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('-webkit-match-nearest-mail-blockquote-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-match-nearest-mail-blockquote-color');
  },
  enumerable: true,
  configurable: true,
};
