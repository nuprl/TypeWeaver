'use strict';

import { parseKeyword } from '../parsers';

var clear_keywords = ['none', 'left', 'right', 'both', 'inherit'];

export const definition = {
  set: function(v: any) {
    this._setProperty('clear', parseKeyword(v, clear_keywords));
  },
  get: function() {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true,
};