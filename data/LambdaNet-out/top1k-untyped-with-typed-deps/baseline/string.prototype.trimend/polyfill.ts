'use strict';

var implementation: String = require('./implementation');

module.exports = function getPolyfill(): String {
	if (!String.prototype.trimEnd && !String.prototype.trimRight) {
		return implementation;
	}
	var zeroWidthSpace: String = '\u200b';
	var trimmed: String = zeroWidthSpace.trimEnd ? zeroWidthSpace.trimEnd() : zeroWidthSpace.trimRight();
	if (trimmed !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimEnd || String.prototype.trimRight;
};
