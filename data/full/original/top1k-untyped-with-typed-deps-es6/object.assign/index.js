'use strict';

import defineProperties from 'define-properties';
import callBind from 'call-bind';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var polyfill = callBind.apply(getPolyfill());
// eslint-disable-next-line no-unused-vars
var bound = function assign(target, source1) {
	return polyfill(Object, arguments);
};

defineProperties(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default bound;
