'use strict';

var TYPES: object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;
var parseMeasurement: Function = require('../parsers').parseMeasurement;

var absoluteSizes: any[] = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var relativeSizes: any[] = ['larger', 'smaller'];

module.exports.isValid = function(v: HTMLElement) {
  var type: number = valueType(v.toLowerCase());
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.KEYWORD && absoluteSizes.indexOf(v.toLowerCase()) !== -1) ||
    (type === TYPES.KEYWORD && relativeSizes.indexOf(v.toLowerCase()) !== -1)
  );
};

function parse(v: string): string {
  const valueAsString: number = String(v).toLowerCase();
  const optionalArguments: any[] = absoluteSizes.concat(relativeSizes);
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
