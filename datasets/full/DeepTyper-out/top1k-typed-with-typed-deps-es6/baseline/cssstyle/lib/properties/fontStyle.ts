'use strict';

var valid_styles: string[] = ['normal', 'italic', 'oblique', 'inherit'];

export const isValid: boolean = function(v: string) {
  return valid_styles.indexOf(v.toLowerCase()) !== -1;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('font-style', v);
  },
  get: function() {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true,
};
