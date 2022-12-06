'use strict';

var getPolyfill: Function = require('./polyfill');
var define: Function = require('define-properties');

module.exports = function shimObjectIs(): boolean {
	var polyfill: boolean = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
