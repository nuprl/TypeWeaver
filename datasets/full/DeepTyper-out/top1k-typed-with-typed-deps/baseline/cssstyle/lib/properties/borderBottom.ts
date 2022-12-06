'use strict';

var shorthandSetter: any = require('../parsers').shorthandSetter;
var shorthandGetter: any = require('../parsers').shorthandGetter;

var shorthand_for: any = {
  'border-bottom-width': require('./borderBottomWidth'),
  'border-bottom-style': require('./borderBottomStyle'),
  'border-bottom-color': require('./borderBottomColor'),
};

module.exports.definition = {
  set: shorthandSetter('border-bottom', shorthand_for),
  get: shorthandGetter('border-bottom', shorthand_for),
  enumerable: true,
  configurable: true,
};
