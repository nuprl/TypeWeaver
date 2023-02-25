'use strict';

export default function getBasicPropertyDescriptor(name: string) {
  return {
    set: function(v: any) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};