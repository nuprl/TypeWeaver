'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimValues(): String {
	var polyfill: String = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): Boolean {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
