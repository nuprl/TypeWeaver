'use strict';

var valid_styles = ['normal', 'italic', 'oblique', 'inherit'];

export const isValid = function(v: |endofmask|>) {
  return valid_styles.indexOf(v.toLowerCase()) !== -1;
};

export const definition = {
  set: function(v: any) {
    this._setProperty('font-style', v);
  },
  get: function() {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true,
};