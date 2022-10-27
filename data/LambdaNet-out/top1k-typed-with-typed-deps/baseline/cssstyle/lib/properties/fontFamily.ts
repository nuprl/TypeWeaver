'use strict';

var TYPES: Object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;

var partsRegEx: RegExp = /\s*,\s*/;
module.exports.isValid = function isValid(v: String): Boolean {
  if (v === '' || v === null) {
    return true;
  }
  var parts: Array = v.split(partsRegEx);
  var len: Number = parts.length;
  var i: Number;
  var type: Number;
  for (i = 0; i < len; i++) {
    type = valueType(parts[i]);
    if (type === TYPES.STRING || type === TYPES.KEYWORD) {
      return true;
    }
  }
  return false;
};

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('font-family', v);
  },
  get: function() {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true,
};
