'use strict';

var isValid: Function = (module.exports.isValid = require('./borderColor').isValid);

module.exports.definition = {
  set: function(v: String) {
    if (isValid(v)) {
      this._setProperty('border-left-color', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-left-color');
  },
  enumerable: true,
  configurable: true,
};
