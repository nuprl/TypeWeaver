'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimAssign(): Boolean {
	var polyfill: String = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};
