'use strict';

import implementation from './implementation';

export default function getPolyfill(): Boolean {
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
