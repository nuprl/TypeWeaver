'use strict';

var isValid = (module.exports.isValid = require('./borderWidth').isValid);

export const definition = {
  set: function(v) {
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
