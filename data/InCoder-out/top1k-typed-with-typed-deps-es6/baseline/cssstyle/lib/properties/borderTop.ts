'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './borderTopWidth';
import './borderTopStyle';
import './borderTopColor';

var shorthand_for = {
  'border-top-width',
  'border-top-style',
  'border-top-color',
};

module.exports.definition = {
  set: shorthandSetter('border-top', shorthand_for),
  get: shorthandGetter('border-top', shorthand_for),
  enumerable: true,
  configurable: true,
};