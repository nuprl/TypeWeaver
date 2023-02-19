'use strict';

var callBind: any = require('call-bind');
var define: any = require('define-properties');
var RequireObjectCoercible: any = require('es-abstract/2021/RequireObjectCoercible');

var implementation: any = require('./implementation');
var getPolyfill: any = require('./polyfill');
var shim: any = require('./shim');

var bound: any = callBind(getPolyfill());
var boundMethod: any = function trim(receiver: any): string {
	RequireObjectCoercible(receiver);
	return bound(receiver);
};

define(boundMethod, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMethod;
