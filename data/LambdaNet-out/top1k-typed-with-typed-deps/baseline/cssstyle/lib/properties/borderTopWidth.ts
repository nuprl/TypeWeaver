'use strict';

var isValid: Function = require('./borderWidth').isValid;
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: String) {
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
