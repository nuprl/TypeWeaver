'use strict';

var define: Function = require('define-properties');
var RequireObjectCoercible: Function = require('es-abstract/2021/RequireObjectCoercible');
var callBind: Function = require('call-bind');
var callBound: Function = require('call-bind/callBound');

var implementation: string = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var polyfill: Function = callBind.apply(getPolyfill());
var shim: string = require('./shim');

var $slice: Function = callBound('Array.prototype.slice');

/* eslint-disable no-unused-vars */
var boundShim: Function = function includes(array: any[], searchElement: Element): Promise {
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
