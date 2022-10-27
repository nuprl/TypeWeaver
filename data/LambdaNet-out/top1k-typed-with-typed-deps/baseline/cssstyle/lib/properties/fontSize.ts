'use strict';

var TYPES: Object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;
var parseMeasurement: Function = require('../parsers').parseMeasurement;

var absoluteSizes: Array = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var relativeSizes: Array = ['larger', 'smaller'];

module.exports.isValid = function(v: HTMLElement) {
  var type: Number = valueType(v.toLowerCase());
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.KEYWORD && absoluteSizes.indexOf(v.toLowerCase()) !== -1) ||
    (type === TYPES.KEYWORD && relativeSizes.indexOf(v.toLowerCase()) !== -1)
  );
};

function parse(v: String): String {
  const valueAsString: Number = String(v).toLowerCase();
  const optionalArguments: Array = absoluteSizes.concat(relativeSizes);
  const isOptionalArgument: Boolean = optionalArguments.some(
    (stringValue: String) => stringValue.toLowerCase() === valueAsString
  );
  return isOptionalArgument ? valueAsString : parseMeasurement(v);
}

module.exports.definition = {
  set: function(v: String) {
    this._setProperty('font-size', parse(v));
  },
  get: function() {
    return this.getPropertyValue('font-size');
  },
  enumerable: true,
  configurable: true,
};
