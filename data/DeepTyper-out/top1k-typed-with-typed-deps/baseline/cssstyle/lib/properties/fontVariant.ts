'use strict';

var valid_variants: string[] = ['normal', 'small-caps', 'inherit'];

module.exports.isValid = function isValid(v: string): boolean {
  return valid_variants.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('font-variant', v);
  },
  get: function() {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true,
};
