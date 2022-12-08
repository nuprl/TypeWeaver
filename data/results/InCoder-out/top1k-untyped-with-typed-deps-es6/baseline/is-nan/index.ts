'use strict';

import callBind from 'call-bind';
import define from 'define-properties';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default polyfill;