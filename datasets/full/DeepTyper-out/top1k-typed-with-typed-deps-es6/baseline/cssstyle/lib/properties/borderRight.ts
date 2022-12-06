'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './borderRightWidth';
import './borderRightStyle';
import './borderRightColor';

var shorthand_for: any = {
  'border-right-width',
  'border-right-style',
  'border-right-color',
};

module.exports.definition = {
  set: shorthandSetter('border-right', shorthand_for),
  get: shorthandGetter('border-right', shorthand_for),
  enumerable: true,
  configurable: true,
};
