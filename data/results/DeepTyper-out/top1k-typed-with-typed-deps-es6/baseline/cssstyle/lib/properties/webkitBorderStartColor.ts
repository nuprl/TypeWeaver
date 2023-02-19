'use strict';

import { parseColor } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('-webkit-border-start-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-start-color');
  },
  enumerable: true,
  configurable: true,
};
