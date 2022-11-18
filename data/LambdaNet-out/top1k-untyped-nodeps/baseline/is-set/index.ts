'use strict';

var $Map: boolean = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set: boolean = typeof Set === 'function' && Set.prototype ? Set : null;

var exported: string;

if (!$Set) {
	// eslint-disable-next-line no-unused-vars
	exported = function isSet(x: string): boolean {
		// `Set` is not present in this environment.
		return false;
	};
}

var $mapHas: string = $Map ? Map.prototype.has : null;
var $setHas: Function = $Set ? Set.prototype.has : null;
if (!exported && !$setHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isSet(x: string): boolean {
		// `Set` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isSet(x: string): boolean {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x);
		if ($mapHas) {
			try {
				$mapHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Set; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};
