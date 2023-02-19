'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: any) {
    this._setProperty('-webkit-column-rule-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-column-rule-color');
  },
  enumerable: true,
  configurable: true,
};