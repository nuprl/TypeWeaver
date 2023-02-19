'use strict';

import parsers from '../parsers';

var valid_keywords: string[] = ['top', 'center', 'bottom', 'left', 'right'];

var parse: any = function parse(v: string): any {
  if (v === '' || v === null) {
    return undefined;
  }
  var parts: string[] = v.split(/\s+/);
  if (parts.length > 2 || parts.length < 1) {
    return undefined;
  }
  var types: any[] = [];
  parts.forEach(function(part: string, index: number) {
    types[index] = parsers.valueType(part);
  });
  if (parts.length === 1) {
    if (types[0] === parsers.TYPES.LENGTH || types[0] === parsers.TYPES.PERCENT) {
      return v;
    }
    if (types[0] === parsers.TYPES.KEYWORD) {
      if (valid_keywords.indexOf(v.toLowerCase()) !== -1 || v.toLowerCase() === 'inherit') {
        return v;
      }
    }
    return undefined;
  }
  if (
    (types[0] === parsers.TYPES.LENGTH || types[0] === parsers.TYPES.PERCENT) &&
    (types[1] === parsers.TYPES.LENGTH || types[1] === parsers.TYPES.PERCENT)
  ) {
    return v;
  }
  if (types[0] !== parsers.TYPES.KEYWORD || types[1] !== parsers.TYPES.KEYWORD) {
    return undefined;
  }
  if (valid_keywords.indexOf(parts[0]) !== -1 && valid_keywords.indexOf(parts[1]) !== -1) {
    return v;
  }
  return undefined;
};

export const isValid: boolean = function isValid(v: any): boolean {
  return parse(v) !== undefined;
};

export const definition: any = {
  set: function(v: any) {
    this._setProperty('background-position', parse(v));
  },
  get: function() {
    return this.getPropertyValue('background-position');
  },
  enumerable: true,
  configurable: true,
};
