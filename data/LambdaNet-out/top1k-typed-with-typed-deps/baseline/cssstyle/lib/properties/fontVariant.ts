'use strict';

var valid_variants: Array = ['normal', 'small-caps', 'inherit'];

module.exports.isValid = function isValid(v: String): Boolean {
  return valid_variants.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('font-variant', v);
  },
  get: function() {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true,
};
