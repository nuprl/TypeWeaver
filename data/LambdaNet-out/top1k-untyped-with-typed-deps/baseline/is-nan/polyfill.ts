'use strict';

var implementation: string = require('./implementation');

module.exports = function getPolyfill(): boolean {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};
