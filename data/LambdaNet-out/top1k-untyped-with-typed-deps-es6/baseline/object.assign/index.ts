'use strict';

import defineProperties from 'define-properties';
import callBind from 'call-bind';
import implementation from './implementation';
import getPolyfill from './polyfill';
import shim from './shim';

var polyfill: Function = callBind.apply(getPolyfill());
// eslint-disable-next-line no-unused-vars
var bound: Function = function assign(target: Object, source1: Function): String {
	return polyfill(Object, arguments);
};

defineProperties(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default bound;
