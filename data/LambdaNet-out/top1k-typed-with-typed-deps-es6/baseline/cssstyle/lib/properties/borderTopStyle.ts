'use strict';

import { isValid } from './borderStyle';
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v) {
    if (isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-top-width');
      }
      this._setProperty('border-top-style', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-top-style');
  },
  enumerable: true,
  configurable: true,
};
