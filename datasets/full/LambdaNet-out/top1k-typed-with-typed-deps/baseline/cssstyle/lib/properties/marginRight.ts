'use strict';

var margin: string = require('./margin.js');
var parsers: string = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('margin', 'right', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-right');
  },
  enumerable: true,
  configurable: true,
};
