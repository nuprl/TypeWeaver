'use strict';

var valid_variants: any[] = ['normal', 'small-caps', 'inherit'];

module.exports.isValid = function isValid(v: string): boolean {
  return valid_variants.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('font-variant', v);
  },
  get: function() {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true,
};
