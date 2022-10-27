'use strict';

var implementation: String = require('./implementation');

module.exports = function getPolyfill(): Boolean {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};
