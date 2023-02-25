'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: string) {
    this._setProperty('color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true,
};