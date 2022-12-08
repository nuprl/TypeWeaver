'use strict';

import GetIntrinsic from 'get-intrinsic';
import callBound from 'call-bind/callBound';

var $WeakSet: any[] = GetIntrinsic('%WeakSet%', true);

var $setHas: Function = callBound('WeakSet.prototype.has', true);

if ($setHas) {
    var $mapHas: Function = callBound('WeakMap.prototype.has', true);

    export default function isWeakSet(x: string): boolean {
		if (!x || typeof x !== 'object') {
			return false;
		}
		try {
			$setHas(x, $setHas);
			if ($mapHas) {
				try {
					$mapHas(x, $mapHas);
				} catch (e) {
					return true;
				}
			}
			return x instanceof $WeakSet; // core-js workaround, pre-v3
		} catch (e) {}
		return false;
	};
} else {
    // eslint-disable-next-line no-unused-vars
    export default function isWeakSet(x: string): boolean {
		// `WeakSet` does not exist, or does not have a `has` method
		return false;
	};
}
