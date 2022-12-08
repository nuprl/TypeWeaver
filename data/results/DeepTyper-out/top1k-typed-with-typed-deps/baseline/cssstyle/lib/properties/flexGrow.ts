'use strict';

var parseNumber: any = require('../parsers').parseNumber;
var POSITION_AT_SHORTHAND: any = require('../constants').POSITION_AT_SHORTHAND;

module.exports.isValid = function isValid(v: any, positionAtFlexShorthand: any): boolean {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.first;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('flex-grow', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-grow');
  },
  enumerable: true,
  configurable: true,
};
