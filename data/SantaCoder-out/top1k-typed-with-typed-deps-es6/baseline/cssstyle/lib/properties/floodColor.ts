'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v: string) {
    this._setProperty('flood-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true,
};