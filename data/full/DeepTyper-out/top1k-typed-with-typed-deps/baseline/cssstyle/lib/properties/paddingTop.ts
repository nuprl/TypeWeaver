'use strict';

var padding: any = require('./padding.js');
var parsers: any = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'top', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-top');
  },
  enumerable: true,
  configurable: true,
};
