'use strict';

var isValid = (module.exports.isValid = require('./borderWidth').isValid);

export const definition = {
  set: function(v: string) {
    if (isValid(v)) {
      this._setProperty('border-left-width', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-left-width');
  },
  enumerable: true,
  configurable: true,
};