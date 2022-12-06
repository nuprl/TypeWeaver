'use strict';

var parseNumber: Function = require('../parsers').parseNumber;
var POSITION_AT_SHORTHAND: Function = require('../constants').POSITION_AT_SHORTHAND;

module.exports.isValid = function isValid(v: any[], positionAtFlexShorthand: number): boolean {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.second;
};

module.exports.definition = {
  set: function(v: any[]) {
    this._setProperty('flex-shrink', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true,
};
