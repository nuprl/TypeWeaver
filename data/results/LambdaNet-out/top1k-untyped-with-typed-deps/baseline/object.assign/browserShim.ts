'use strict';

var keys: object = require('object-keys').shim();
delete keys.shim;

var assign: any[] = require('./');

module.exports = assign.shim();

delete assign.shim;
