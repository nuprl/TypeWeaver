'use strict';

var define: any = require('define-properties');
var getPolyfill: any = require('./polyfill');

module.exports = function shimAssign(): any {
	var polyfill: any = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};
