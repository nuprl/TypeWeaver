'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimAssign(): string {
	var polyfill: string = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};
