'use strict';

import { parseNumber } from '../parsers';
import { POSITION_AT_SHORTHAND } from '../constants';

export const isValid: boolean = function isValid(v: any, positionAtFlexShorthand: any): boolean {
  return parseNumber(v) !== undefined && positionAtFlexShorthand === POSITION_AT_SHORTHAND.second;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('flex-shrink', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true,
};
