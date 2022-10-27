'use strict';

import parsers from '../parsers';

var isValid: boolean = (module.exports.isValid = function isValid(v: any): boolean {
  return (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit')
  );
});

export const definition: any = {
  set: function(v: any) {
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
