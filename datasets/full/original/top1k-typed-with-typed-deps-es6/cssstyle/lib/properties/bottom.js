'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('bottom', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true,
};
