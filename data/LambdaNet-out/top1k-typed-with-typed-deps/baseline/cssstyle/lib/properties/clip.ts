'use strict';

var parseMeasurement: Function = require('../parsers').parseMeasurement;

var shape_regex: RegExp = /^rect\((.*)\)$/i;

var parse: Function = function(val: String) {
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
  var matches: Object = val.match(shape_regex);
  if (!matches) {
    return undefined;
  }
  var parts: Array = matches[1].split(/\s*,\s*/);
  if (parts.length !== 4) {
    return undefined;
  }
  var valid: Boolean = parts.every(function(part: Number, index: Number) {
    var measurement: String = parseMeasurement(part);
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
  set: function(v: String) {
    this._setProperty('clip', parse(v));
  },
  get: function() {
    return this.getPropertyValue('clip');
  },
  enumerable: true,
  configurable: true,
};
