'use strict';

import { parseColor } from '../parsers';

export const definition: Object = {
  set: function(v: Array) {
    this._setProperty('flood-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true,
};
