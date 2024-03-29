'use strict';

var callBind: Function = require('call-bind');
var define: Function = require('define-properties');

var implementation: string = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: string = require('./shim');

var polyfill: boolean = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;
