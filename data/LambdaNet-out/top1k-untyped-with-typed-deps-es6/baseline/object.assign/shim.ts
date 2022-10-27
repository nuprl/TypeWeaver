'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimAssign(): String {
	var polyfill: String = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};
