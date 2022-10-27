'use strict';

var parsers: String = require('../parsers');
var implicitSetter: Function = require('../parsers').implicitSetter;

// the valid border-widths:
var widths: Array = ['thin', 'medium', 'thick'];

module.exports.isValid = function parse(v: String): Boolean {
  var length: String = parsers.parseLength(v);
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
var isValid: Function = module.exports.isValid;

var parser: Function = function(v: String) {
  var length: String = parsers.parseLength(v);
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
