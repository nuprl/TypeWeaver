'use strict';

import define from 'define-properties';
import RequireObjectCoercible from 'es-abstract/2021/RequireObjectCoercible';
import callBind from 'call-bind';
import callBound from 'call-bind/callBound';
import implementation from './implementation';
import getPolyfill from './polyfill';
var polyfill: any = callBind.apply(getPolyfill());
import shim from './shim';

var $slice = callBound('Array.prototype.slice');

/* eslint-disable no-unused-vars */
var boundShim: boolean = function includes(array: any, searchElement: any): boolean {
/* eslint-enable no-unused-vars */
	RequireObjectCoercible(array);
	return polyfill(array, $slice(arguments, 1));
};
define(boundShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default boundShim;
