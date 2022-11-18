'use strict';

var hasSymbols: Function = require('has-symbols/shams');

module.exports = function hasToStringTagShams(): boolean {
	return hasSymbols() && !!Symbol.toStringTag;
};
