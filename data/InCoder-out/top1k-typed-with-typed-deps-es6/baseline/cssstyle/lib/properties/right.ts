'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v: any) {
    this._setProperty('right', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('right');
  },
  enumerable: true,
  configurable: true,
};