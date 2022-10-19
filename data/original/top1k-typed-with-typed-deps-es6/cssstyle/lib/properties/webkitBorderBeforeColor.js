'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('-webkit-border-before-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true,
};
