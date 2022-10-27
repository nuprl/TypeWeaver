'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimValues(): Boolean {
	var polyfill: String = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): Boolean {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
