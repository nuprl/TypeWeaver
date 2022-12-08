'use strict';

import { parseColor } from '../parsers';

export const definition: object = {
  set: function(v: any[]) {
    this._setProperty('text-overline-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('text-overline-color');
  },
  enumerable: true,
  configurable: true,
};
