'use strict';

var hasSymbols: any = require('has-symbols/shams');

module.exports = function hasToStringTagShams(): boolean {
	return hasSymbols() && !!Symbol.toStringTag;
};
