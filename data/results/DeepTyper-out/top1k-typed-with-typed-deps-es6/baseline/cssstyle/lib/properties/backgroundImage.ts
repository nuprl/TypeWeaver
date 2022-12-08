'use strict';

import parsers from '../parsers';

var parse: any = function parse(v: string): any {
  var parsed: any = parsers.parseUrl(v);
  if (parsed !== undefined) {
    return parsed;
  }
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'none' || v.toLowerCase() === 'inherit')
  ) {
    return v;
  }
  return undefined;
};

export const isValid: boolean = function isValid(v: any): boolean {
  return parse(v) !== undefined;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('background-image', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true,
};
