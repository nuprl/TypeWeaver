'use strict';

import { parseColor } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('outline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('outline-color');
  },
  enumerable: true,
  configurable: true,
};
