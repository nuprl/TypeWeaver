'use strict';

var isValid: Function = (module.exports.isValid = require('./borderColor').isValid);

export const definition: object = {
  set: function(v: string) {
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
