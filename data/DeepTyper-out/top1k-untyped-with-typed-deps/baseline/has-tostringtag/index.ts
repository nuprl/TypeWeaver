'use strict';

var hasSymbols: any = require('has-symbols');

module.exports = function hasToStringTag(): boolean {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
