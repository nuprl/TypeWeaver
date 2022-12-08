'use strict';

var parsers: any = require('../parsers');

// <length> <length>? | inherit
// if one, it applies to both horizontal and verical spacing
// if two, the first applies to the horizontal and the second applies to vertical spacing

var parse: any = function parse(v: string): any {
  if (v === '' || v === null) {
    return undefined;
  }
  if (v === 0) {
    return '0px';
  }
  if (v.toLowerCase() === 'inherit') {
    return v;
  }
  var parts: string[] = v.split(/\s+/);
  if (parts.length !== 1 && parts.length !== 2) {
    return undefined;
  }
  parts.forEach(function(part: string) {
    if (parsers.valueType(part) !== parsers.TYPES.LENGTH) {
      return undefined;
    }
  });

  return v;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('border-spacing', parse(v));
  },
  get: function() {
    return this.getPropertyValue('border-spacing');
  },
  enumerable: true,
  configurable: true,
};
