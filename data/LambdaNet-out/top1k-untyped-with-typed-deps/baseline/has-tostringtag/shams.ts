'use strict';

var hasSymbols: Function = require('has-symbols/shams');

module.exports = function hasToStringTagShams(): Boolean {
	return hasSymbols() && !!Symbol.toStringTag;
};
