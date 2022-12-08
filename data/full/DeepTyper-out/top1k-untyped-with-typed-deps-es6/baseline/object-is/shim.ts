'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimObjectIs(): void {
	var polyfill: any = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
