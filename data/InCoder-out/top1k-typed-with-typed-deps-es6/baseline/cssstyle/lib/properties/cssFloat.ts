'use strict';

export const definition = {
  set: function(v: any) {
    this._setProperty('float', v);
  },
  get: function() {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true,
};