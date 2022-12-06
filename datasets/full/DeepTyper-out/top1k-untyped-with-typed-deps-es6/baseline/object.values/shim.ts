'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimValues(): void {
	var polyfill: any = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues(): any {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};
