'use strict';

var implementation: any = require('./implementation');

module.exports = function getPolyfill(): string {
	if (!String.prototype.trimStart && !String.prototype.trimLeft) {
		return implementation;
	}
	var zeroWidthSpace: string = '\u200b';
	var trimmed: string = zeroWidthSpace.trimStart ? zeroWidthSpace.trimStart() : zeroWidthSpace.trimLeft();
	if (trimmed !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimStart || String.prototype.trimLeft;
};
