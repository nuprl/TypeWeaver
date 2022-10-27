'use strict';

var implementation: String = require('./implementation');

module.exports = Function.prototype.bind || implementation;
