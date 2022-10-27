'use strict';

var padding: String = require('./padding.js');
var parsers: String = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'right', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true,
};
