'use strict';

import getPolyfill from './polyfill';
import define from 'define-properties';

export default function shimObjectIs(): Boolean {
	var polyfill: Boolean = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs(): Boolean {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};
