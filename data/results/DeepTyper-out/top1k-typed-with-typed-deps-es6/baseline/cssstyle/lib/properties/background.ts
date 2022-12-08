'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './backgroundColor';
import './backgroundImage';
import './backgroundRepeat';
import './backgroundAttachment';
import './backgroundPosition';

var shorthand_for: any = {
  'background-color',
  'background-image',
  'background-repeat',
  'background-attachment',
  'background-position',
};

module.exports.definition = {
  set: shorthandSetter('background', shorthand_for),
  get: shorthandGetter('background', shorthand_for),
  enumerable: true,
  configurable: true,
};
