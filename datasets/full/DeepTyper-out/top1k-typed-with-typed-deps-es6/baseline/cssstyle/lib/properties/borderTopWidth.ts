'use strict';

import { isValid } from './borderWidth';
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: any) {
    if (isValid(v)) {
      this._setProperty('border-top-width', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-top-width');
  },
  enumerable: true,
  configurable: true,
};
