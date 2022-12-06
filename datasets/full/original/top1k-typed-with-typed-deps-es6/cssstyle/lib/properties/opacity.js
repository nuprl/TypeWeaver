'use strict';

import { parseNumber } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('opacity', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true,
};
