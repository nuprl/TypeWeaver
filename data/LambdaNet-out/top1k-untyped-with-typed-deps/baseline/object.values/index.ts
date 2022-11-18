'use strict';

var define: Function = require('define-properties');
var callBind: Function = require('call-bind');

var implementation: string = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: string = require('./shim');

var polyfill: boolean = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;
