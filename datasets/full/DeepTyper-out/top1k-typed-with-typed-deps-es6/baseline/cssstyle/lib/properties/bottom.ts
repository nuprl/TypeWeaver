'use strict';

import { parseMeasurement } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('bottom', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true,
};
