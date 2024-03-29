'use strict';

module.exports = function getBasicPropertyDescriptor(name: string) {
  return {
    set: function(v: T) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};