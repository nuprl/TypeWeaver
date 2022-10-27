'use strict';

module.exports = function getBasicPropertyDescriptor(name: String): Object {
  return {
    set: function(v: String) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};
