'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('-webkit-border-before-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true,
};
