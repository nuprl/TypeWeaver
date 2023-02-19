'use strict';

var isValid = (module.exports.isValid = require('./borderColor').isValid);

export const definition = {
  set: function(v: any) {
    if (isValid(v)) {
      this._setProperty('border-bottom-color', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-bottom-color');
  },
  enumerable: true,
  configurable: true,
};