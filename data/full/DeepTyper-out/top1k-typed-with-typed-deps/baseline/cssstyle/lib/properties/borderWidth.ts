'use strict';

var parsers: any = require('../parsers');
var implicitSetter: any = require('../parsers').implicitSetter;

// the valid border-widths:
var widths: string[] = ['thin', 'medium', 'thick'];

module.exports.isValid = function parse(v: any): any {
  var length: any = parsers.parseLength(v);
  if (length !== undefined) {
    return true;
  }
  if (typeof v !== 'string') {
    return false;
  }
  if (v === '') {
    return true;
  }
  v = v.toLowerCase();
  if (widths.indexOf(v) === -1) {
    return false;
  }
  return true;
};
var isValid: boolean = module.exports.isValid;

var parser: any = function(v: any) {
  var length: any = parsers.parseLength(v);
  if (length !== undefined) {
    return length;
  }
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

module.exports.definition = {
  set: implicitSetter('border', 'width', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-width');
  },
  enumerable: true,
  configurable: true,
};
