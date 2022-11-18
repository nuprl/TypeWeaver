'use strict';

module.exports = function getBasicPropertyDescriptor(name: string): object {
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
