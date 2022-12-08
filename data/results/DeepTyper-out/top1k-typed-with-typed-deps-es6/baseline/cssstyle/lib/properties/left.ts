'use strict';

import { parseMeasurement } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('left', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true,
};
