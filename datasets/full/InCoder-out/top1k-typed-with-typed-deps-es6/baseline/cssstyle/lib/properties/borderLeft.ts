'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './borderLeftWidth';
import './borderLeftStyle';
import './borderLeftColor';

var shorthand_for = {
  'border-left-width',
  'border-left-style',
  'border-left-color',
};

module.exports.definition = {
  set: shorthandSetter('border-left', shorthand_for),
  get: shorthandGetter('border-left', shorthand_for),
  enumerable: true,
  configurable: true,
};