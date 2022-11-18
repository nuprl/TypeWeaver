'use strict';

var callBind: Function = require('call-bind');
var define: Function = require('define-properties');
var RequireObjectCoercible: Function = require('es-abstract/2021/RequireObjectCoercible');

var implementation: string = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: string = require('./shim');

var bound: Function = callBind(getPolyfill());
var boundMethod: Function = function trim(receiver: string): boolean {
	RequireObjectCoercible(receiver);
	return bound(receiver);
};

define(boundMethod, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMethod;
