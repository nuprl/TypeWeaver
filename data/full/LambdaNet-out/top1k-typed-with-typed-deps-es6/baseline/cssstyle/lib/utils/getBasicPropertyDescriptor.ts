'use strict';

export default function getBasicPropertyDescriptor(name) {
  return {
    set: function(v) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};
