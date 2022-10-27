'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

module.exports = function shimTrimStart(): Boolean {
	var polyfill: Number = getPolyfill();
	define(
		String.prototype,
		{ trimStart: polyfill },
		{ trimStart: function () { return String.prototype.trimStart !== polyfill; } }
	);
	return polyfill;
};
