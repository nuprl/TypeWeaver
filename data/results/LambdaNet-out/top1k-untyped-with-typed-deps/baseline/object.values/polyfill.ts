'use strict';

var implementation: string = require('./implementation');

module.exports = function getPolyfill(): string {
	return typeof Object.values === 'function' ? Object.values : implementation;
};
