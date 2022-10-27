'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimEntries(): Boolean {
	var polyfill: String = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries(): Boolean {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};
