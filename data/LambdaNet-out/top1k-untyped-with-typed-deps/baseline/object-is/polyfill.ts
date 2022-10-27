'use strict';

var implementation: String = require('./implementation');

module.exports = function getPolyfill(): Array {
	return typeof Object.is === 'function' ? Object.is : implementation;
};
