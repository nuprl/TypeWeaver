'use strict';

import parsers from '../parsers';

var parse: any = function parse(v: string): any {
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'collapse' ||
      v.toLowerCase() === 'separate' ||
      v.toLowerCase() === 'inherit')
  ) {
    return v;
  }
  return undefined;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('border-collapse', parse(v));
  },
  get: function() {
    return this.getPropertyValue('border-collapse');
  },
  enumerable: true,
  configurable: true,
};
