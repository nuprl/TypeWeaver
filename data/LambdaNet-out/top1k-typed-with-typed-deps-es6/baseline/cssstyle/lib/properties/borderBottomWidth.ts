'use strict';

var isValid: Function = (module.exports.isValid = require('./borderWidth').isValid);

export const definition: Object = {
  set: function(v: String) {
    if (isValid(v)) {
      this._setProperty('border-bottom-width', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-bottom-width');
  },
  enumerable: true,
  configurable: true,
};
