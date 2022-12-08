'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimEntries(): void {
	var polyfill: any = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries(): boolean {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};
