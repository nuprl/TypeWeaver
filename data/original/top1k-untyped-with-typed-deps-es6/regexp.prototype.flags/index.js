'use strict';

import define from 'define-properties';
import callBind from 'call-bind';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var flagsBound = callBind(getPolyfill());

define(flagsBound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default flagsBound;
