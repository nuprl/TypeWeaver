'use strict';

var defineProperties: Function = require('define-properties');
var callBind: Function = require('call-bind');

var implementation: String = require('./implementation');
var getPolyfill: Function = require('./polyfill');
var shim: Array = require('./shim');

var polyfill: Function = callBind.apply(getPolyfill());
// eslint-disable-next-line no-unused-vars
var bound: Function = function assign(target: Object, source1: Function): String {
	return polyfill(Object, arguments);
};

defineProperties(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;
