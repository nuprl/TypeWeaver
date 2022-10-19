'use strict';

import define from 'define-properties';
import callBind from 'call-bind';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var bound = callBind(getPolyfill(), Object);

define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default bound;
