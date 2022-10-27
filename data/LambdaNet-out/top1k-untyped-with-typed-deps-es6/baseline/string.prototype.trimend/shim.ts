'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimTrimEnd(): Boolean {
	var polyfill: Number = getPolyfill();
	define(
		String.prototype,
		{ trimEnd: polyfill },
		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill; } }
	);
	return polyfill;
};
