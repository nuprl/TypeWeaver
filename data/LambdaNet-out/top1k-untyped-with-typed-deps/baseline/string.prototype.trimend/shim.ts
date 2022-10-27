'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimTrimEnd(): Boolean {
	var polyfill: Number = getPolyfill();
	define(
		String.prototype,
		{ trimEnd: polyfill },
		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill; } }
	);
	return polyfill;
};
