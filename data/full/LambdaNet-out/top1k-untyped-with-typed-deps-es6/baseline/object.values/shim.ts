'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimValues(): boolean {
	var polyfill: string = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): boolean {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
