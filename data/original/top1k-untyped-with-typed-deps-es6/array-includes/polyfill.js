'use strict';

import implementation from './implementation';

export default function getPolyfill() {
	if (
		Array.prototype.includes
		&& Array(1).includes(undefined) // https://bugzilla.mozilla.org/show_bug.cgi?id=1767541
	) {
		return Array.prototype.includes;
	}
	return implementation;
};
