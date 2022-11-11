'use strict';

import { parseMeasurement } from '../parsers';

var shape_regex = /^rect\((.*)\)$/i;

var parse = function(val: any) {
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
  var matches = val.match(shape_regex);
  if (!matches) {
    return undefined;
  }
  var parts = matches[1].split(/\s*,\s*/);
  if (parts.length !== 4) {
    return undefined;
  }
  var valid = parts.every(function(part: Part,  index: number) {
    var measurement = parseMeasurement(part);
    parts[index] = measurement;
    return measurement !== undefined;
  });
  if (!valid) {
    return undefined;
  }
  parts = parts.join(', ');
  return val.replace(matches[1], parts);
};

export const definition = {
  set: function(v: any) {
    this._setProperty('clip', parse(v));
  },
  get: function() {
    return this.getPropertyValue('clip');
  },
  enumerable: true,
  configurable: true,
};