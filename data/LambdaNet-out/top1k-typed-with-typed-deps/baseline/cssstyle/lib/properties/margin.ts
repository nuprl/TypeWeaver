'use strict';

var parsers: any[] = require('../parsers.js');
var TYPES: object = parsers.TYPES;

var isValid: Function = function(v: string) {
  if (v.toLowerCase() === 'auto') {
    return true;
  }
  var type: string = parsers.valueType(v);
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.INTEGER && (v === '0' || v === 0))
  );
};

var parser: Function = function(v: string) {
  var V: number = v.toLowerCase();
  if (V === 'auto') {
    return V;
  }
  return parsers.parseMeasurement(v);
};

var mySetter: Function = parsers.implicitSetter('margin', '', isValid, parser);
var myGlobal: Function = parsers.implicitSetter(
  'margin',
  '',
  function() {
    return true;
  },
  function(v: any[]) {
    return v;
  }
);

module.exports.definition = {
  set: function(v: string) {
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
