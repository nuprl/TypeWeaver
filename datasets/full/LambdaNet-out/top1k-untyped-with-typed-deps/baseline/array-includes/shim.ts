'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimArrayPrototypeIncludes(): boolean {
	var polyfill: boolean = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};
