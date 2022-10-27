'use strict';

import { parseMeasurement } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};
