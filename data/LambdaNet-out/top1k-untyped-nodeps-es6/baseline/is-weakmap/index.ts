'use strict';

var $WeakMap: String = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet: String = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported: String;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakMap(x: String): Boolean {
		// `WeakMap` is not present in this environment.
		return false;
	};
}

var $mapHas: Function = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas: Function = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakMap(x: String): Boolean {
		// `WeakMap` does not have a `has` method
		return false;
	};
}

export default exported || function isWeakMap(x: String): Boolean {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x, $mapHas);
		if ($setHas) {
			try {
				$setHas.call(x, $setHas);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakMap; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};
