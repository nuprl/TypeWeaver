'use strict';

var isValid: Function = require('./borderStyle').isValid;
module.exports.isValid = isValid;

module.exports.definition = {
  set: function(v: String) {
    if (isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-bottom-width');
      }
      this._setProperty('border-bottom-style', v);
    }
  },
  get: function() {
    return this.getPropertyValue('border-bottom-style');
  },
  enumerable: true,
  configurable: true,
};
