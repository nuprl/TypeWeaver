'use strict';

import implementation from './implementation';

export default function getPolyfill(): number {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};
