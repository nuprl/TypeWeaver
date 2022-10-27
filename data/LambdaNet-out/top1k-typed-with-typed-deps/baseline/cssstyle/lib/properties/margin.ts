'use strict';

var parsers: Array = require('../parsers.js');
var TYPES: Object = parsers.TYPES;

var isValid: Function = function(v: String) {
  if (v.toLowerCase() === 'auto') {
    return true;
  }
  var type: String = parsers.valueType(v);
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.INTEGER && (v === '0' || v === 0))
  );
};

var parser: Function = function(v: String) {
  var V: Number = v.toLowerCase();
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
  function(v: Array) {
    return v;
  }
);

module.exports.definition = {
  set: function(v: String) {
    if (typeof v === 'number') {
      v = String(v);
    }
    if (typeof v !== 'string') {
      return;
    }
    var V: String = v.toLowerCase();
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
