'use strict';

var parseMeasurement: any = require('../parsers').parseMeasurement;

var shape_regex: RegExp = /^rect\((.*)\)$/i;

var parse: any = function(val: any) {
  if (val === '' || val === null) {
    return val;
  }
  if (typeof val !== 'string') {
    return undefined;
  }
  val = val.toLowerCase();
  if (val === 'auto' || val === 'inherit') {
    return val;
  }
  var matches: any = val.match(shape_regex);
  if (!matches) {
    return undefined;
  }
  var parts: string[] = matches[1].split(/\s*,\s*/);
  if (parts.length !== 4) {
    return undefined;
  }
  var valid: boolean = parts.every(function(part: any, index: number) {
    var measurement: any = parseMeasurement(part);
    parts[index] = measurement;
    return measurement !== undefined;
  });
  if (!valid) {
    return undefined;
  }
  parts = parts.join(', ');
  return val.replace(matches[1], parts);
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('clip', parse(v));
  },
  get: function() {
    return this.getPropertyValue('clip');
  },
  enumerable: true,
  configurable: true,
};
