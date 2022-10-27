'use strict';

var padding: any = require('./padding.js');
var parsers: any = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('padding', 'left', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-left');
  },
  enumerable: true,
  configurable: true,
};
