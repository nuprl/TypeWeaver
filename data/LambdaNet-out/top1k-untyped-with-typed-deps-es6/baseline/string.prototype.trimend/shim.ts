'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimTrimEnd(): boolean {
	var polyfill: number = getPolyfill();
	define(
		String.prototype,
		{ trimEnd: polyfill },
		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill; } }
	);
	return polyfill;
};
