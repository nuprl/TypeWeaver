'use strict';

import { parseColor } from '../parsers';

export const definition: any = {
  set: function(v: any) {
    this._setProperty('-webkit-match-nearest-mail-blockquote-color', parseColor(v));
  },
  get: function() {
    return this.getPropertyValue('-webkit-match-nearest-mail-blockquote-color');
  },
  enumerable: true,
  configurable: true,
};
