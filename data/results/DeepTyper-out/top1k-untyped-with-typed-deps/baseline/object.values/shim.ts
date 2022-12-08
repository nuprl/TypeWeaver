'use strict';

var getPolyfill: any = require('./polyfill');
var define: any = require('define-properties');

module.exports = function shimValues(): any {
	var polyfill: any = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): any {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
