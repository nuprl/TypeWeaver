'use strict';

var margin: any = require('./margin.js');
var parsers: any = require('../parsers.js');

module.exports.definition = {
  set: parsers.subImplicitSetter('margin', 'top', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-top');
  },
  enumerable: true,
  configurable: true,
};
