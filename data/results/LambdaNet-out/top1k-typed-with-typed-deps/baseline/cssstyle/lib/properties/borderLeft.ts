'use strict';

var shorthandSetter: Function = require('../parsers').shorthandSetter;
var shorthandGetter: Function = require('../parsers').shorthandGetter;

var shorthand_for: object = {
  'border-left-width': require('./borderLeftWidth'),
  'border-left-style': require('./borderLeftStyle'),
  'border-left-color': require('./borderLeftColor'),
};

module.exports.definition = {
  set: shorthandSetter('border-left', shorthand_for),
  get: shorthandGetter('border-left', shorthand_for),
  enumerable: true,
  configurable: true,
};
