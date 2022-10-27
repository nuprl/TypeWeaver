'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimArrayPrototypeIncludes(): Boolean {
	var polyfill: Boolean = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};
