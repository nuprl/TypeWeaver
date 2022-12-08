'use strict';

var callBind: any = require('call-bind');
var define: any = require('define-properties');

var implementation: any = require('./implementation');
var getPolyfill: any = require('./polyfill');
var shim: any = require('./shim');

var polyfill: any = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;
