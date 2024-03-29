'use strict';

var parseNumber = require('../parsers').parseNumber;
var POSITION_AT_SHORTHAND = require('../constants').POSITION_AT_SHORTHAND;

module.exports.isValid = function isValid(v: string, positionAtFlexShorthand: number) {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.first;
};

module.exports.definition = {
  set: function(v: number) {
    this._setProperty('flex-grow', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-grow');
  },
  enumerable: true,
  configurable: true,
};