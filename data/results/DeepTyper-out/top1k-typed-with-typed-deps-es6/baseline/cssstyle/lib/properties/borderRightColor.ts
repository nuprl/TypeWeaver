'use strict';

var isValid: boolean = (module.exports.isValid = require('./borderColor').isValid);

export const definition: any = {
  set: function(v: any) {
    if (isValid(v)) {
      this._setProperty('border-right-color', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-right-color');
  },
  enumerable: true,
  configurable: true,
};
