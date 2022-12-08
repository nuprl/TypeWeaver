'use strict';

import { TYPES } from '../parsers';
import { valueType } from '../parsers';

export const isValid = function isValid(v: any) {
  var type = valueType(v);
  return (
    (type === TYPES.KEYWORD && v.toLowerCase() === 'normal') ||
    v.toLowerCase() === 'inherit' ||
    type === TYPES.NUMBER ||
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT
  );
};

export const definition = {
  set: function(v: number) {
    this._setProperty('line-height', v);
  },
  get: function() {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true,
};