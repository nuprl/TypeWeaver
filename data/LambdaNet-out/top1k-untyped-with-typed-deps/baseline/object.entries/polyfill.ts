'use strict';

var implementation: String = require('./implementation');

module.exports = function getPolyfill(): String {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};
