'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimValues(): boolean {
	var polyfill: string = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): boolean {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
