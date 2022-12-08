'use strict';

var valid_variants: string[] = ['normal', 'small-caps', 'inherit'];

export const isValid: boolean = function isValid(v: string): boolean {
  return valid_variants.indexOf(v.toLowerCase()) !== -1;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('font-variant', v);
  },
  get: function() {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true,
};
