'use strict';

// modified from https://github.com/es-shims/es6-shim
var objectKeys: Function = require('object-keys');
var hasSymbols: Boolean = require('has-symbols/shams')();
var callBound: Function = require('call-bind/callBound');
var toObject: Array = Object;
var $push: Function = callBound('Array.prototype.push');
var $propIsEnumerable: Function = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols: Array = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target: String, source1: Number): Object {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to: Object = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from: Object = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys: Array = objectKeys(from);
		var getSymbols: Function = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms: Array = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key: String = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey: String = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue: String = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};
