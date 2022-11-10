'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: any) {
    this._setProperty('-webkit-text-stroke-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-text-stroke-color');
  },
  enumerable: true,
  configurable: true,
};