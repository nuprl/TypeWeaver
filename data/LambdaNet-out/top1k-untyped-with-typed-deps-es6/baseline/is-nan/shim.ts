'use strict';

import define from 'define-properties';
import getPolyfill from './polyfill';

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

export default function shimNumberIsNaN(): Promise {
	var polyfill: String = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN(): Boolean {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};
