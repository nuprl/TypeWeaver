'use strict';

import { parseMeasurement } from '../parsers';

export const definition = {
  set: function(v: string) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};