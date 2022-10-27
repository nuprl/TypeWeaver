'use strict';

var margin: String = require('./margin.js');
var parsers: String = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('margin', 'left', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-left');
  },
  enumerable: true,
  configurable: true,
};
