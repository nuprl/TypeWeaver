'use strict';

var hasSymbols: Function = require('has-symbols');

module.exports = function hasToStringTag(): boolean {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
