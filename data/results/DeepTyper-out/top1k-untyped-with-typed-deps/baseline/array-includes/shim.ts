'use strict';

var define: any = require('define-properties');
var getPolyfill: any = require('./polyfill');

module.exports = function shimArrayPrototypeIncludes(): any {
	var polyfill: any = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};
