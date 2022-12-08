'use strict';

import RequireObjectCoercible from 'es-abstract/2021/RequireObjectCoercible';
import callBound from 'call-bind/callBound';

var $isEnumerable: Function = callBound('Object.prototype.propertyIsEnumerable');
var $push: Function = callBound('Array.prototype.push');

export default function values(O: string): any[] {
	var obj: object = RequireObjectCoercible(O);
	var vals: any[] = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(vals, obj[key]);
		}
	}
	return vals;
};
