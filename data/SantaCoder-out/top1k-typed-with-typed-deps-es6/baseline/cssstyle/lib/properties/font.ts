'use strict';

import { TYPES } from '../parsers';
import { valueType } from '../parsers';
import { shorthandParser } from '../parsers';
import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './fontFamily';
import './fontSize';
import './fontStyle';
import './fontVariant';
import './fontWeight';
import './lineHeight';

var shorthand_for = {
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'line-height',
};

var static_fonts = [
  'caption',
  'icon',
  'menu',
  'message-box',
  'small-caption',
  'status-bar',
  'inherit',
];

var setter = shorthandSetter('font', shorthand_for);

module.exports.definition = {
  set: function(v: string) {
    var short = shorthandParser(v, shorthand_for);
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