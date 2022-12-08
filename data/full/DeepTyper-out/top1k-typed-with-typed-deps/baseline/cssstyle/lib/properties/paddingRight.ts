'use strict';

var padding: any = require('./padding.js');
var parsers: any = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'right', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true,
};
