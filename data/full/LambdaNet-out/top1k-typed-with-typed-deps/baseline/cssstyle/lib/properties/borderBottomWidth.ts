'use strict';

var isValid: Function = (module.exports.isValid = require('./borderWidth').isValid);

module.exports.definition = {
  set: function(v: string) {
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
