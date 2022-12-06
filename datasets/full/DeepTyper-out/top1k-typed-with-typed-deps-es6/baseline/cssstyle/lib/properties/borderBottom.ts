'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './borderBottomWidth';
import './borderBottomStyle';
import './borderBottomColor';

var shorthand_for: any = {
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color',
};

module.exports.definition = {
  set: shorthandSetter('border-bottom', shorthand_for),
  get: shorthandGetter('border-bottom', shorthand_for),
  enumerable: true,
  configurable: true,
};
