'use strict';

import parsers from '../parsers';

var isValid = (module.exports.isValid = function isValid(v: any) {
  return (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit')
  );
});

export const definition = {
  set: function(v: string) {
    if (!isValid(v)) {
      return;
    }
    this._setProperty('background-attachment', v);
  },
  get: function() {
    return this.getPropertyValue('background-attachment');
  },
  enumerable: true,
  configurable: true,
};