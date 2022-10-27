'use strict';

import { isValid } from './borderStyle';
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: any) {
    if (isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-right-width');
      }
      this._setProperty('border-right-style', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-right-style');
  },
  enumerable: true,
  configurable: true,
};
