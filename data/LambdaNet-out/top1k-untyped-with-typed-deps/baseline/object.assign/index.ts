'use strict';

var defineProperties: Function = require('define-properties');
var callBind: Function = require('call-bind');

var implementation: string = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: string = require('./shim');

var polyfill: Function = callBind.apply(getPolyfill());
// eslint-disable-next-line no-unused-vars
var bound: Function = function assign(target: object, source1: Function): string {
	return polyfill(Object, arguments);
};

defineProperties(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;
