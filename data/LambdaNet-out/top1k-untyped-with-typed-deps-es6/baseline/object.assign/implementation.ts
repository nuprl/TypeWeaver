'use strict';

// modified from https://github.com/es-shims/es6-shim
import objectKeys from 'object-keys';

import hasSymbolsFactory from 'has-symbols/shams';
const hasSymbols: boolean = hasSymbolsFactory();
import callBound from 'call-bind/callBound';
var toObject: any[] = Object;
var $push: Function = callBound('Array.prototype.push');
var $propIsEnumerable: Function = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols: any[] = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
export default function assign(target: Function, source1: Function): object {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to: object = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from: object = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys: any[] = objectKeys(from);
		var getSymbols: Function = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms: any[] = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key: string = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey: string = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue: string = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};
