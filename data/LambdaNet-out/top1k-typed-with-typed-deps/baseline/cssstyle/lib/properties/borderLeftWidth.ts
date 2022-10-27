'use strict';

var isValid: Function = (module.exports.isValid = require('./borderWidth').isValid);

module.exports.definition = {
  set: function(v: String) {
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
