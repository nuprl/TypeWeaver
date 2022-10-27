'use strict';

var hasSymbols: Function = require('has-symbols');

module.exports = function hasToStringTag(): Boolean {
	return hasSymbols() && typeof Symbol.toStringTag === 'symbol';
};
