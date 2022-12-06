'use strict';

var implementation: any = require('./implementation');

module.exports = function getPolyfill(): string {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};
