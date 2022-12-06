'use strict';

import RequireObjectCoercible from 'es-abstract/2021/RequireObjectCoercible';
import callBound from 'call-bind/callBound';
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $push = callBound('Array.prototype.push');

export default function entries(O) {
	var obj = RequireObjectCoercible(O);
	var entrys = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(entrys, [key, obj[key]]);
		}
	}
	return entrys;
};
