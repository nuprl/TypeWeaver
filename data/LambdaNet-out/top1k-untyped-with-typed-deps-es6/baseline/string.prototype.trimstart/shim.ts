'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

export default function shimTrimStart(): Boolean {
	var polyfill: Number = getPolyfill();
	define(
		String.prototype,
		{ trimStart: polyfill },
		{ trimStart: function () { return String.prototype.trimStart !== polyfill; } }
	);
	return polyfill;
};
