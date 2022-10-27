'use strict';

var TYPES: Object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;

module.exports.isValid = function isValid(v: String): Boolean {
  var type: Number = valueType(v);
  return (
    (type === TYPES.KEYWORD && v.toLowerCase() === 'normal') ||
    v.toLowerCase() === 'inherit' ||
    type === TYPES.NUMBER ||
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT
  );
};

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('line-height', v);
  },
  get: function() {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true,
};
