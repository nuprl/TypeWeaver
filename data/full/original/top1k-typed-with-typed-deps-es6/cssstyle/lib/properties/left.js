'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('left', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true,
};
