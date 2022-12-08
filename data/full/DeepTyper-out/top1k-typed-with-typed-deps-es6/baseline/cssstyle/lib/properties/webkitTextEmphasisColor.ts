'use strict';

import { parseColor } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('-webkit-text-emphasis-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-text-emphasis-color');
  },
  enumerable: true,
  configurable: true,
};
