'use strict';

import parsers from '../parsers';

var parse: any = function parse(v: string): any {
  var parsed: any = parsers.parseColor(v);
  if (parsed !== undefined) {
    return parsed;
  }
  if (
    parsers.valueType(v) === parsers.TYPES.KEYWORD &&
    (v.toLowerCase() === 'transparent' || v.toLowerCase() === 'inherit')
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
    var parsed: any = parse(v);
    if (parsed === undefined) {
      return;
    }
    this._setProperty('background-color', parsed);
  },
  get: function() {
    return this.getPropertyValue('background-color');
  },
  enumerable: true,
  configurable: true,
};
