'use strict';

var isValid: Function = require('./borderStyle').isValid;
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: String) {
    if (isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-right-width');
      }
      this._setProperty('border-right-style', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-right-style');
  },
  enumerable: true,
  configurable: true,
};
