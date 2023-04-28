'use strict';

import callBind from 'call-bind';
import define from 'define-properties';
import RequireObjectCoercible from 'es-abstract/2021/RequireObjectCoercible';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var bound = callBind(getPolyfill());
var boundMethod = function trim(receiver: unknown) {
	RequireObjectCoercible(receiver);
	return bound(receiver);
};

define(boundMethod, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default boundMethod;