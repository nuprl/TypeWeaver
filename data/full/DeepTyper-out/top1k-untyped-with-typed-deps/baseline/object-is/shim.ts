'use strict';

var getPolyfill: any = require('./polyfill');
var define: any = require('define-properties');

module.exports = function shimObjectIs(): void {
	var polyfill: any = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
