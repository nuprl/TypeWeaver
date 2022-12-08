'use strict';

import parsers from '../parsers';
import { implicitSetter } from '../parsers';

// the valid border-widths:
var widths: string[] = ['thin', 'medium', 'thick'];

export const isValid: boolean = function parse(v: any): boolean {
  var length: number = parsers.parseLength(v);
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
  var length: number = parsers.parseLength(v);
  if (length !== undefined) {
    return length;
  }
  if (isValid(v)) {
    return v.toLowerCase();
  }
  return undefined;
};

export const definition: any = {
  set: implicitSetter('border', 'width', isValid, parser),
  get: function() {
    return this.getPropertyValue('border-width');
  },
  enumerable: true,
  configurable: true,
};
