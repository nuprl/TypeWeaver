'use strict';

import { parseKeyword } from '../parsers';

var clear_keywords: string[] = ['none', 'left', 'right', 'both', 'inherit'];

export const definition: any = {
  set: function(v: any) {
    this._setProperty('clear', parseKeyword(v, clear_keywords));
  },
  get: function() {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true,
};
