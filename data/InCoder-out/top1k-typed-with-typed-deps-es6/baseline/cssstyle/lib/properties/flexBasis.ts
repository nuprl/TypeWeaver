'use strict';

import { parseMeasurement } from '../parsers';

function parse(v: any) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }
  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }
  return parseMeasurement(v);
}

export const isValid = function isValid(v: string) {
  return parse(v) !== undefined;
};

export const definition = {
  set: function(v: any) {
    this._setProperty('flex-basis', parse(v));
  },
  get: function() {
    return this.getPropertyValue('flex-basis');
  },
  enumerable: true,
  configurable: true,
};