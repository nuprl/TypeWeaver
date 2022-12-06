'use strict';

import { parseColor } from '../parsers';

export const definition: object = {
  set: function(v: any[]) {
    this._setProperty('color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true,
};
