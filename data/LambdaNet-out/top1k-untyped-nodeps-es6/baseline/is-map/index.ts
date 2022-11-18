'use strict';

var $Map: boolean = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set: boolean = typeof Set === 'function' && Set.prototype ? Set : null;

var exported: Function;

if (!$Map) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x: string): boolean {
		// `Map` is not present in this environment.
		return false;
	};
}

var $mapHas: Function = $Map ? Map.prototype.has : null;
var $setHas: string = $Set ? Set.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x: string): boolean {
		// `Map` does not have a `has` method
		return false;
	};
}

export default exported || function isMap(x: string): boolean {
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
