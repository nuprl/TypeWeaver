'use strict';

var padding: string = require('./padding.js');
var parsers: string = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'bottom', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-bottom');
  },
  enumerable: true,
  configurable: true,
};
