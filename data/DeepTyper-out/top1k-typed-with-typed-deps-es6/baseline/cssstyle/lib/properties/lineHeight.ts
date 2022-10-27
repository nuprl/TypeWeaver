'use strict';

import { TYPES } from '../parsers';
import { valueType } from '../parsers';

export const isValid: boolean = function isValid(v: any): boolean {
  var type = valueType(v);
  return (
    (type === TYPES.KEYWORD && v.toLowerCase() === 'normal') ||
    v.toLowerCase() === 'inherit' ||
    type === TYPES.NUMBER ||
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT
  );
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('line-height', v);
  },
  get: function() {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true,
};
