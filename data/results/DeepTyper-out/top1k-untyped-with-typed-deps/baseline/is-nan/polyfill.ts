'use strict';

var implementation: any = require('./implementation');

module.exports = function getPolyfill(): any {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};
