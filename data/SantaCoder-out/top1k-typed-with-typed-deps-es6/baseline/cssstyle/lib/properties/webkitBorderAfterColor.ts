'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: any) {
    this._setProperty('-webkit-border-after-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-after-color');
  },
  enumerable: true,
  configurable: true,
};