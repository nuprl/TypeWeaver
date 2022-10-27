'use strict';

var define: Function = require('define-properties');
var callBind: Function = require('call-bind');

var implementation: String = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: String = require('./shim');

var polyfill: Boolean = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;
