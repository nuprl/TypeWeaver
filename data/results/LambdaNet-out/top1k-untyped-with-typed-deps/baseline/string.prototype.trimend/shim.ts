'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimTrimEnd(): boolean {
	var polyfill: number = getPolyfill();
	define(
		String.prototype,
		{ trimEnd: polyfill },
		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill; } }
	);
	return polyfill;
};
