'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimEntries(): boolean {
	var polyfill: string = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries(): boolean {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};
