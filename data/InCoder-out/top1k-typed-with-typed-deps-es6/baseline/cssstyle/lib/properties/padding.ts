'use strict';

import parsers from '../parsers.js';
var TYPES = parsers.TYPES;

var isValid = function(v: any) {
  var type = parsers.valueType(v);
  return (
    type === TYPES.LENGTH ||
    type === TYPES.PERCENT ||
    (type === TYPES.INTEGER && (v === '0' || v === 0))
  );
};

var parser = function(v: any) {
  return parsers.parseMeasurement(v);
};

var mySetter = parsers.implicitSetter('padding', '', isValid, parser);
var myGlobal = parsers.implicitSetter(
  'padding',
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
    var V = v.toLowerCase();
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
    return this.getPropertyValue('padding');
  },
  enumerable: true,
  configurable: true,
};

module.exports.isValid = isValid;
module.exports.parser = parser;