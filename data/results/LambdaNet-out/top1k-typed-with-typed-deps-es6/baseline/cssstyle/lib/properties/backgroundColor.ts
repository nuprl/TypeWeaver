'use strict';

import parsers from '../parsers';

var parse: Function = function parse(v: string): string {
  var parsed: number = parsers.parseColor(v);
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

export const isValid: string = function isValid(v: any[]): boolean {
  return parse(v) !== undefined;
};

export const definition: object = {
  set: function(v: any[]) {
    var parsed = parse(v);
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
