'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('text-line-through-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-line-through-color');
  },
  enumerable: true,
  configurable: true,
};
