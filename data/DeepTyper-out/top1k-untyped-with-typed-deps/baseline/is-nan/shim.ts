'use strict';

var define: any = require('define-properties');
var getPolyfill: any = require('./polyfill');

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN(): void {
	var polyfill: any = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN(): boolean {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};
