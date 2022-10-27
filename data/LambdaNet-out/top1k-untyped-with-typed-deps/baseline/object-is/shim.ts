'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimObjectIs(): Boolean {
	var polyfill: Boolean = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): Boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
