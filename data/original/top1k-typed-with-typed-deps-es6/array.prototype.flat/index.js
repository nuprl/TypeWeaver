'use strict';

import define from 'define-properties';
import callBind from 'call-bind';
import implementation from './implementation';
import getPolyfill from './polyfill';
var polyfill = getPolyfill();
import shim from './shim';

var boundFlat = callBind(polyfill);

define(boundFlat, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

export default boundFlat;
