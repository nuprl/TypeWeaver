'use strict';

import { parseMeasurement } from '../parsers';

function parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }
  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }
  return parseMeasurement(v);
}

export const definition = {
  set: function(v) {
    this._setProperty('width', parse(v));
  },
  get: function() {
    return this.getPropertyValue('width');
  },
  enumerable: true,
  configurable: true,
};