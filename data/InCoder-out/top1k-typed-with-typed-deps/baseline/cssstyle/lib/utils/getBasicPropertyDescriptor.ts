'use strict';

module.exports = function getBasicPropertyDescriptor(name: PropertyKey) {
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