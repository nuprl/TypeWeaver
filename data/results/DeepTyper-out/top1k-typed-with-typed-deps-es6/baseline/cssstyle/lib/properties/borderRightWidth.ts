'use strict';

var isValid: boolean = (module.exports.isValid = require('./borderWidth').isValid);

export const definition: any = {
  set: function(v: any) {
    if (isValid(v)) {
      this._setProperty('border-right-width', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-right-width');
  },
  enumerable: true,
  configurable: true,
};
