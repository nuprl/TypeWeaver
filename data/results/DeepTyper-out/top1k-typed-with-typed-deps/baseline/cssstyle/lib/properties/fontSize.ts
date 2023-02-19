'use strict';

var TYPES: any = require('../parsers').TYPES;
var valueType: any = require('../parsers').valueType;
var parseMeasurement: any = require('../parsers').parseMeasurement;

var absoluteSizes: string[] = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var relativeSizes: string[] = ['larger', 'smaller'];

module.exports.isValid = function(v: string) {
  var type = valueType(v.toLowerCase());
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.KEYWORD && absoluteSizes.indexOf(v.toLowerCase()) !== -1) ||
    (type === TYPES.KEYWORD && relativeSizes.indexOf(v.toLowerCase()) !== -1)
  );
};

function parse(v: string): any {
  const valueAsString: string = String(v).toLowerCase();
  const optionalArguments: string[] = absoluteSizes.concat(relativeSizes);
  const isOptionalArgument: boolean = optionalArguments.some(
    (stringValue: string) => stringValue.toLowerCase() === valueAsString
  );
  return isOptionalArgument ? valueAsString : parseMeasurement(v);
}

module.exports.definition = {
  set: function(v: string) {
    this._setProperty('font-size', parse(v));
  },
  get: function() {
    return this.getPropertyValue('font-size');
  },
  enumerable: true,
  configurable: true,
};
