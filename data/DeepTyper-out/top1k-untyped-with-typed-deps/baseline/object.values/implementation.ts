'use strict';

var RequireObjectCoercible: any = require('es-abstract/2021/RequireObjectCoercible');
var callBound: any = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $push = callBound('Array.prototype.push');

module.exports = function values(O: any): any {
	var obj: any = RequireObjectCoercible(O);
	var vals: any[] = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(vals, obj[key]);
		}
	}
	return vals;
};
