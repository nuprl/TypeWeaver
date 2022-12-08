'use strict';

var shorthandSetter: any = require('../parsers').shorthandSetter;
var shorthandGetter: any = require('../parsers').shorthandGetter;

var shorthand_for: any = {
  'background-color': require('./backgroundColor'),
  'background-image': require('./backgroundImage'),
  'background-repeat': require('./backgroundRepeat'),
  'background-attachment': require('./backgroundAttachment'),
  'background-position': require('./backgroundPosition'),
};

module.exports.definition = {
  set: shorthandSetter('background', shorthand_for),
  get: shorthandGetter('background', shorthand_for),
  enumerable: true,
  configurable: true,
};
