'use strict';

var define: any = require('define-properties');
var RequireObjectCoercible: any = require('es-abstract/2021/RequireObjectCoercible');
var callBind: any = require('call-bind');
var callBound: any = require('call-bind/callBound');

var implementation: any = require('./implementation');
var getPolyfill: any = require('./polyfill');
var polyfill: any = callBind.apply(getPolyfill());
var shim: any = require('./shim');

var $slice = callBound('Array.prototype.slice');

/* eslint-disable no-unused-vars */
var boundShim: any = function includes(array: any, searchElement: any): any {
/* eslint-enable no-unused-vars */
	RequireObjectCoercible(array);
	return polyfill(array, $slice(arguments, 1));
};
define(boundShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundShim;
