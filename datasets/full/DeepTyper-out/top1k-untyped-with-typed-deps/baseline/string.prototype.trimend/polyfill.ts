'use strict';

var implementation: any = require('./implementation');

module.exports = function getPolyfill(): string {
	if (!String.prototype.trimEnd && !String.prototype.trimRight) {
		return implementation;
	}
	var zeroWidthSpace: string = '\u200b';
	var trimmed: string = zeroWidthSpace.trimEnd ? zeroWidthSpace.trimEnd() : zeroWidthSpace.trimRight();
	if (trimmed !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimEnd || String.prototype.trimRight;
};
