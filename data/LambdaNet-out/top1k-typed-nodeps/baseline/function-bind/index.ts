'use strict';

var implementation: string = require('./implementation');

module.exports = Function.prototype.bind || implementation;
