'use strict';

var TYPES: any = require('../parsers').TYPES;
var valueType: any = require('../parsers').valueType;
var shorthandParser: any = require('../parsers').shorthandParser;
var shorthandSetter: any = require('../parsers').shorthandSetter;
var shorthandGetter: any = require('../parsers').shorthandGetter;

var shorthand_for: any = {
  'font-family': require('./fontFamily'),
  'font-size': require('./fontSize'),
  'font-style': require('./fontStyle'),
  'font-variant': require('./fontVariant'),
  'font-weight': require('./fontWeight'),
  'line-height': require('./lineHeight'),
};

var static_fonts: string[] = [
  'caption',
  'icon',
  'menu',
  'message-box',
  'small-caption',
  'status-bar',
  'inherit',
];

var setter: any = shorthandSetter('font', shorthand_for);

module.exports.definition = {
  set: function(v: any) {
    var short: string = shorthandParser(v, shorthand_for);
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
