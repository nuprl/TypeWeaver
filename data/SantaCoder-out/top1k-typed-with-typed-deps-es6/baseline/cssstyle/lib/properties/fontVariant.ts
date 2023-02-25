'use strict';

var valid_variants = ['normal', 'small-caps', 'inherit'];

export const isValid = function isValid(v: string) {
  return valid_variants.indexOf(v.toLowerCase()) !== -1;
};

export const definition = {
  set: function(v: string) {
    this._setProperty('font-variant', v);
  },
  get: function() {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true,
};