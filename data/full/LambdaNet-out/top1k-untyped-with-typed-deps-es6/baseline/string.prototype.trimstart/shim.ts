'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimTrimStart(): boolean {
	var polyfill: number = getPolyfill();
	define(
		String.prototype,
		{ trimStart: polyfill },
		{ trimStart: function () { return String.prototype.trimStart !== polyfill; } }
	);
	return polyfill;
};
