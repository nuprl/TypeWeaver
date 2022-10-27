'use strict';

var padding: String = require('./padding.js');
var parsers: String = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'left', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-left');
  },
  enumerable: true,
  configurable: true,
};
