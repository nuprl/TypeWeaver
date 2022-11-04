'use strict';

import { parseNumber } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('opacity', parseNumber(v));
  },
  get: function() {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true,
};