'use strict';

var define: any = require('define-properties');
var callBind: any = require('call-bind');

var implementation: any = require('./implementation');
var getPolyfill: any = require('./polyfill');
var shim: any = require('./shim');

var polyfill: any = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;
