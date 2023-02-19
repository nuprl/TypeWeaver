'use strict';

import RequireObjectCoercible from 'es-abstract/2021/RequireObjectCoercible';
import callBound from 'call-bind/callBound';

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $push = callBound('Array.prototype.push');

export default function values(O: any): any {
	var obj: any = RequireObjectCoercible(O);
	var vals: any[] = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(vals, obj[key]);
		}
	}
	return vals;
};
