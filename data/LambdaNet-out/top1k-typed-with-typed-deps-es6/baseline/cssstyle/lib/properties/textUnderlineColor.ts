'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('text-underline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true,
};
