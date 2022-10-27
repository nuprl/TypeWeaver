'use strict';

// modified from https://github.com/es-shims/es6-shim
var objectKeys: any = require('object-keys');
var hasSymbols: any = require('has-symbols/shams')();
var callBound: any = require('call-bind/callBound');
var toObject: any = Object;
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols: any = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target: any, source1: any): any {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to: any = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys: any = objectKeys(from);
		var getSymbols: boolean = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms: any = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key: any = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey: string = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue: any = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};
