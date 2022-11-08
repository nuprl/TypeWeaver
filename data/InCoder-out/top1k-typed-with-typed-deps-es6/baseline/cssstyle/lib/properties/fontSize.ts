'use strict';

import { TYPES } from '../parsers';
import { valueType } from '../parsers';
import { parseMeasurement } from '../parsers';

var absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var relativeSizes = ['larger', 'smaller'];

export const isValid = function(v: any) {
  var type = valueType(v.toLowerCase());
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.KEYWORD && absoluteSizes.indexOf(v.toLowerCase()) !== -1) ||
    (type === TYPES.KEYWORD && relativeSizes.indexOf(v.toLowerCase()) !== -1)
  );
};

function parse(v: any) {
  const valueAsString = String(v).toLowerCase();
  const optionalArguments = absoluteSizes.concat(relativeSizes);
  const isOptionalArgument = optionalArguments.some(
    stringValue => stringValue.toLowerCase() === valueAsString
  );
  return isOptionalArgument ? valueAsString : parseMeasurement(v);
}

export const definition = {
  set: function(v: any) {
    this._setProperty('font-size', parse(v));
  },
  get: function() {
    return this.getPropertyValue('font-size');
  },
  enumerable: true,
  configurable: true,
};