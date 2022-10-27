'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('stop-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('stop-color');
  },
  enumerable: true,
  configurable: true,
};
