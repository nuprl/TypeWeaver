'use strict';

var implementation: string = require('./implementation');

module.exports = function getPolyfill(): any[] {
	return typeof Object.is === 'function' ? Object.is : implementation;
};
