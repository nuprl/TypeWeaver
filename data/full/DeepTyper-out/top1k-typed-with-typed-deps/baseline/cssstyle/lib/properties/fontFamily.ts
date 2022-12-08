'use strict';

var TYPES: any = require('../parsers').TYPES;
var valueType: any = require('../parsers').valueType;

var partsRegEx: RegExp = /\s*,\s*/;
module.exports.isValid = function isValid(v: any): boolean {
  if (v === '' || v === null) {
    return true;
  }
  var parts: string[] = v.split(partsRegEx);
  var len: number = parts.length;
  var i: any;
  var type;
  for (i = 0; i < len; i++) {
    type = valueType(parts[i]);
    if (type === TYPES.STRING || type === TYPES.KEYWORD) {
      return true;
    }
  }
  return false;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('font-family', v);
  },
  get: function() {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true,
};
