'use strict';

import { parseMeasurement } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('top', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true,
};
