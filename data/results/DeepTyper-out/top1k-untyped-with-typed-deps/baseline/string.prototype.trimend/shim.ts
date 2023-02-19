'use strict';

var define: any = require('define-properties');
var getPolyfill: any = require('./polyfill');

module.exports = function shimTrimEnd(): any {
	var polyfill: any = getPolyfill();
	define(
		String.prototype,
		{ trimEnd: polyfill },
		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill; } }
	);
	return polyfill;
};
