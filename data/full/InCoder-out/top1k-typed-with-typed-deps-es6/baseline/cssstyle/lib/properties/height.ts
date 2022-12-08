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

export const definition = {
  set: function(v: number) {
    this._setProperty('height', parse(v));
  },
  get: function() {
    return this.getPropertyValue('height');
  },
  enumerable: true,
  configurable: true,
};