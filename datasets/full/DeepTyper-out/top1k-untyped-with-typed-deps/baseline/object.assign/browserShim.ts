'use strict';

var keys: any = require('object-keys').shim();
delete keys.shim;

var assign: any = require('./');

module.exports = assign.shim();

delete assign.shim;
