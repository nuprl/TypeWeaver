'use strict';

var margin: String = require('./margin.js');
var parsers: String = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('margin', 'bottom', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-bottom');
  },
  enumerable: true,
  configurable: true,
};
