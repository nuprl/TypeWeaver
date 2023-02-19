'use strict';

var implementation: any = require('./implementation');

module.exports = Function.prototype.bind || implementation;
