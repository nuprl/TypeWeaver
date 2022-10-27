'use strict';

export default function getBasicPropertyDescriptor(name: string): any {
  return {
    set: function(v: string) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};
