'use strict';

import implementation from './implementation';

export default function getPolyfill(): Boolean {
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
