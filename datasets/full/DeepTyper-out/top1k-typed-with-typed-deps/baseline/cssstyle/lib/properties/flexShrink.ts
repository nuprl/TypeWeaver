'use strict';

var parseNumber: any = require('../parsers').parseNumber;
var POSITION_AT_SHORTHAND: any = require('../constants').POSITION_AT_SHORTHAND;

module.exports.isValid = function isValid(v: any, positionAtFlexShorthand: any): boolean {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.second;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('flex-shrink', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true,
};
