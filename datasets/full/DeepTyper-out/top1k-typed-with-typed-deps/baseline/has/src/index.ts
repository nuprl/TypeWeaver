'use strict';

var bind: any = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
