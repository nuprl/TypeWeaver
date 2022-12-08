'use strict';

import { TYPES } from '../parsers';
import { valueType } from '../parsers';

var partsRegEx: string = /\s*,\s*/;

export const isValid: boolean = function isValid(v: any): boolean {
  if (v === '' || v === null) {
    return true;
  }
  var parts: string[] = v.split(partsRegEx);
  var len: number = parts.length;
  var i: number;
  var type;
  for (i = 0; i < len; i++) {
    type = valueType(parts[i]);
    if (type === TYPES.STRING || type === TYPES.KEYWORD) {
      return true;
    }
  }
  return false;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('font-family', v);
  },
  get: function() {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true,
};
