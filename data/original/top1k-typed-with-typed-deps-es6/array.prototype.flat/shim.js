'use strict';

import define from 'define-properties';
import shimUnscopables from 'es-shim-unscopables';
import getPolyfill from './polyfill';

export default function shimFlat() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ flat: polyfill },
		{ flat: function () { return Array.prototype.flat !== polyfill; } }
	);

	shimUnscopables('flat');

	return polyfill;
};
