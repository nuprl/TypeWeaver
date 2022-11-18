'use strict';

var TYPES: object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;

var partsRegEx: RegExp = /\s*,\s*/;
module.exports.isValid = function isValid(v: string): boolean {
  if (v === '' || v === null) {
    return true;
  }
  var parts: any[] = v.split(partsRegEx);
  var len: number = parts.length;
  var i: number;
  var type: number;
  for (i = 0; i < len; i++) {
    type = valueType(parts[i]);
    if (type === TYPES.STRING || type === TYPES.KEYWORD) {
      return true;
    }
  }
  return false;
};

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('font-family', v);
  },
  get: function() {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true,
};
