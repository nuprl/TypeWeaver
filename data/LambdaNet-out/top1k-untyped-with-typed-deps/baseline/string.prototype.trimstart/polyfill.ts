'use strict';

var implementation: String = require('./implementation');

module.exports = function getPolyfill(): String {
	if (!String.prototype.trimStart && !String.prototype.trimLeft) {
		return implementation;
	}
	var zeroWidthSpace: String = '\u200b';
	var trimmed: String = zeroWidthSpace.trimStart ? zeroWidthSpace.trimStart() : zeroWidthSpace.trimLeft();
	if (trimmed !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimStart || String.prototype.trimLeft;
};
