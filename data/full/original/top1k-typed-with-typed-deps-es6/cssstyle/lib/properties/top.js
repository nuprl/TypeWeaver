'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};
