'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimObjectIs(): boolean {
	var polyfill: boolean = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
