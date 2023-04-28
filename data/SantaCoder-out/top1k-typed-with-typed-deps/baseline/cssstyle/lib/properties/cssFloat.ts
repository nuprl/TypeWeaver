'use strict';

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('float', v);
  },
  get: function() {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true,
};