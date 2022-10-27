'use strict';

var TYPES: Object = require('../parsers').TYPES;
var valueType: Function = require('../parsers').valueType;
var shorthandParser: Function = require('../parsers').shorthandParser;
var shorthandSetter: Function = require('../parsers').shorthandSetter;
var shorthandGetter: Function = require('../parsers').shorthandGetter;

var shorthand_for: Object = {
  'font-family': require('./fontFamily'),
  'font-size': require('./fontSize'),
  'font-style': require('./fontStyle'),
  'font-variant': require('./fontVariant'),
  'font-weight': require('./fontWeight'),
  'line-height': require('./lineHeight'),
};

var static_fonts: Array = [
  'caption',
  'icon',
  'menu',
  'message-box',
  'small-caption',
  'status-bar',
  'inherit',
];

var setter: Function = shorthandSetter('font', shorthand_for);

module.exports.definition = {
  set: function(v: String) {
    var short: String = shorthandParser(v, shorthand_for);
    if (short !== undefined) {
      return setter.call(this, v);
    }
    if (valueType(v) === TYPES.KEYWORD && static_fonts.indexOf(v.toLowerCase()) !== -1) {
      this._setProperty('font', v);
    }
  },
  get: shorthandGetter('font', shorthand_for),
  enumerable: true,
  configurable: true,
};
