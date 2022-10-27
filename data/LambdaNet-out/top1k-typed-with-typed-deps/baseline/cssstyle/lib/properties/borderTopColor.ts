'use strict';

var isValid: Function = (module.exports.isValid = require('./borderColor').isValid);

module.exports.definition = {
  set: function(v: String) {
    if (isValid(v)) {
      this._setProperty('border-top-color', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-top-color');
  },
  enumerable: true,
  configurable: true,
};
