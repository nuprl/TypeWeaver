'use strict';

var shorthandSetter: Function = require('../parsers').shorthandSetter;
var shorthandGetter: Function = require('../parsers').shorthandGetter;

var shorthand_for: Object = {
  'border-top-width': require('./borderTopWidth'),
  'border-top-style': require('./borderTopStyle'),
  'border-top-color': require('./borderTopColor'),
};

module.exports.definition = {
  set: shorthandSetter('border-top', shorthand_for),
  get: shorthandGetter('border-top', shorthand_for),
  enumerable: true,
  configurable: true,
};
