'use strict';

var valid_styles = ['normal', 'italic', 'oblique', 'inherit'];

module.exports.isValid = function(v: ny) {
  return valid_styles.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: string | boolean) {
    this._setProperty('font-style', v);
  },
  get: function() {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true,
};