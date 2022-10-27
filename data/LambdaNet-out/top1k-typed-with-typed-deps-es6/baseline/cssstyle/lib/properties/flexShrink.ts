'use strict';

import { parseNumber } from '../parsers';
import { POSITION_AT_SHORTHAND } from '../constants';

export const isValid = function isValid(v, positionAtFlexShorthand) {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.second;
};

export const definition = {
  set: function(v) {
    this._setProperty('flex-shrink', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true,
};
