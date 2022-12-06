'use strict';

var parsers: any[] = require('../parsers');

var parse: Function = function parse(v: string): string {
  var parsed: string = parsers.parseColor(v);
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

module.exports.isValid = function isValid(v: any[]): boolean {
  return parse(v) !== undefined;
};

module.exports.definition = {
  set: function(v: any[]) {
    var parsed: string = parse(v);
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
