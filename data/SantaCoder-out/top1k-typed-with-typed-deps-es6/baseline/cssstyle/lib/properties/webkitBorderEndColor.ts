'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: any) {
    this._setProperty('-webkit-border-end-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-end-color');
  },
  enumerable: true,
  configurable: true,
};