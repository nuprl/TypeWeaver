'use strict';

import { parseMeasurement } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('right', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('right');
  },
  enumerable: true,
  configurable: true,
};
