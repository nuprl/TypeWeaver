'use strict';

import { parseColor } from '../parsers';

export const definition = {
  set: function(v) {
    this._setProperty('flood-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true,
};
