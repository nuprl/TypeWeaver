'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimEntries(): Boolean {
	var polyfill: String = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries(): Boolean {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};
