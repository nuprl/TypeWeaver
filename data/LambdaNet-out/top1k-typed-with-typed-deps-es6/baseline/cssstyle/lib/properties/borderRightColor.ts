'use strict';

var isValid: Function = (module.exports.isValid = require('./borderColor').isValid);

export const definition: Object = {
  set: function(v: String) {
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
