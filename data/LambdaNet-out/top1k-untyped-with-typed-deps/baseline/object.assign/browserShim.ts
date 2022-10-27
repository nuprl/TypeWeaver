'use strict';

var keys: Object = require('object-keys').shim();
delete keys.shim;

var assign: Array = require('./');

module.exports = assign.shim();

delete assign.shim;
