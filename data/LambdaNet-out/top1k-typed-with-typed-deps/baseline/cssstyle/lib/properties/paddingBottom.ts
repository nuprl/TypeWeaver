'use strict';

var padding: String = require('./padding.js');
var parsers: String = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'bottom', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-bottom');
  },
  enumerable: true,
  configurable: true,
};
