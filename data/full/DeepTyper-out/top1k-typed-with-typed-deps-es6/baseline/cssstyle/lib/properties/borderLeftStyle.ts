'use strict';

import { isValid } from './borderStyle';
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: any) {
    if (isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-left-width');
      }
      this._setProperty('border-left-style', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-left-style');
  },
  enumerable: true,
  configurable: true,
};
