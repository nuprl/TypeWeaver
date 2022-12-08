'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('-webkit-tap-highlight-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-tap-highlight-color');
  },
  enumerable: true,
  configurable: true,
};
