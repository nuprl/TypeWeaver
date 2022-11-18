'use strict';

var TYPES: object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;

module.exports.isValid = function isValid(v: string): boolean {
  var type: number = valueType(v);
  return (
    (type === TYPES.KEYWORD && v.toLowerCase() === 'normal') ||
    v.toLowerCase() === 'inherit' ||
    type === TYPES.NUMBER ||
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT
  );
};

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('line-height', v);
  },
  get: function() {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true,
};
