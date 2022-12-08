'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('outline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('outline-color');
  },
  enumerable: true,
  configurable: true,
};
