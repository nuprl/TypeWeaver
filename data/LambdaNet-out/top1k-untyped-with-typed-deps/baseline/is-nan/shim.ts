'use strict';

var define: Function = require('define-properties');
var getPolyfill: Function = require('./polyfill');

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN(): Promise {
	var polyfill: String = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN(): Boolean {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};
