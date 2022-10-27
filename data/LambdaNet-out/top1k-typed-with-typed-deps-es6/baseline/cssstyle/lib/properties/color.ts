'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true,
};
