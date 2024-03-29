'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimArrayPrototypeIncludes(): boolean {
	var polyfill: boolean = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};
