'use strict';

var padding: string = require('./padding.js');
var parsers: string = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'right', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true,
};
