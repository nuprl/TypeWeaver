'use strict';

var valid_styles: Array = ['normal', 'italic', 'oblique', 'inherit'];

module.exports.isValid = function(v: String) {
  return valid_styles.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('font-style', v);
  },
  get: function() {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true,
};
