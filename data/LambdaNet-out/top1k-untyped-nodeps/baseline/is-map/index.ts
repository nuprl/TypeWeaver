'use strict';

var $Map: Boolean = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set: Boolean = typeof Set === 'function' && Set.prototype ? Set : null;

var exported: Function;

if (!$Map) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x: String): Boolean {
		// `Map` is not present in this environment.
		return false;
	};
}

var $mapHas: String = $Map ? Map.prototype.has : null;
var $setHas: String = $Set ? Set.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x: String): Boolean {
		// `Map` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isMap(x: String): Boolean {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x);
		if ($setHas) {
			try {
				$setHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Map; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};
