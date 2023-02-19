'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('text-underline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true,
};
