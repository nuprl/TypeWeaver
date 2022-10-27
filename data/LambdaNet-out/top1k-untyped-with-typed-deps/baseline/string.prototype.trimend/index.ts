'use strict';

var callBind: Function = require('call-bind');
var define: Function = require('define-properties');
var RequireObjectCoercible: Function = require('es-abstract/2021/RequireObjectCoercible');

var implementation: String = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: String = require('./shim');

var bound: Function = callBind(getPolyfill());
var boundMethod: Function = function trim(receiver: String): Boolean {
	RequireObjectCoercible(receiver);
	return bound(receiver);
};

define(boundMethod, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMethod;
