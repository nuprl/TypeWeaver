'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v: string) {
    this._setProperty('bottom', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true,
};