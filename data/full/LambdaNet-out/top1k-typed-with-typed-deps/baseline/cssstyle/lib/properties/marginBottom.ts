'use strict';

var margin: string = require('./margin.js');
var parsers: string = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('margin', 'bottom', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-bottom');
  },
  enumerable: true,
  configurable: true,
};
