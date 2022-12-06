'use strict';

var define: any = require('define-properties');
var getPolyfill: any = require('./polyfill');

module.exports = function shimTrimStart(): any {
	var polyfill: any = getPolyfill();
	define(
		String.prototype,
		{ trimStart: polyfill },
		{ trimStart: function () { return String.prototype.trimStart !== polyfill; } }
	);
	return polyfill;
};
