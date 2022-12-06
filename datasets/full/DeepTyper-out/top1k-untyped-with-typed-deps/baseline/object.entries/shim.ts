'use strict';

var getPolyfill: any = require('./polyfill');
var define: any = require('define-properties');

module.exports = function shimEntries(): any {
	var polyfill: any = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries(): boolean {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};
