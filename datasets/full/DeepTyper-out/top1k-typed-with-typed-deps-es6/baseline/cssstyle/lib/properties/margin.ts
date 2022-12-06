'use strict';

import parsers from '../parsers.js';
var TYPES: any = parsers.TYPES;

var isValid: boolean = function(v: any) {
  if (v.toLowerCase() === 'auto') {
    return true;
  }
  var type = parsers.valueType(v);
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.INTEGER && (v === '0' || v === 0))
  );
};

var parser: any = function(v: any) {
  var V: string = v.toLowerCase();
  if (V === 'auto') {
    return V;
  }
  return parsers.parseMeasurement(v);
};

var mySetter: boolean = parsers.implicitSetter('margin', '', isValid, parser);
var myGlobal: boolean = parsers.implicitSetter(
  'margin',
  '',
  function() {
    return true;
  },
  function(v: any) {
    return v;
  }
);

module.exports.definition = {
  set: function(v: any) {
    if (typeof v === 'number') {
      v = String(v);
    }
    if (typeof v !== 'string') {
      return;
    }
    var V: string = v.toLowerCase();
    switch (V) {
      case 'inherit':
      case 'initial':
      case 'unset':
      case '':
        myGlobal.call(this, V);
        break;

      default:
        mySetter.call(this, v);
        break;
    }
  },
  get: function() {
    return this.getPropertyValue('margin');
  },
  enumerable: true,
  configurable: true,
};

module.exports.isValid = isValid;
module.exports.parser = parser;
