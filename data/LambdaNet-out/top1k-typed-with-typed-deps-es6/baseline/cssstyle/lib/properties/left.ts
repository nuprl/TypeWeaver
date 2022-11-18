'use strict';

import { parseMeasurement } from '../parsers';

export const definition: object = {
  set: function(v: Function) {
    this._setProperty('left', parseMeasurement(v));
  },
  get: function() {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true,
};
