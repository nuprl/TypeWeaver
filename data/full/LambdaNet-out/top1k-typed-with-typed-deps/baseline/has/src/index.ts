'use strict';

var bind: Function = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
