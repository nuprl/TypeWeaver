'use strict';

var defineProperties: any = require('define-properties');
var callBind: any = require('call-bind');

var implementation: any = require('./implementation');
var getPolyfill: any = require('./polyfill');
var shim: any = require('./shim');

var polyfill: any = callBind.apply(getPolyfill());
// eslint-disable-next-line no-unused-vars
var bound: any = function assign(target: any, source1: any): any {
	return polyfill(Object, arguments);
};

defineProperties(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;
