'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimValues() {
	var polyfill = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues() {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};