'use strict';

var RequireObjectCoercible: Function = require('es-abstract/2021/RequireObjectCoercible');
var callBound: Function = require('call-bind/callBound');
var $isEnumerable: Function = callBound('Object.prototype.propertyIsEnumerable');
var $push: Function = callBound('Array.prototype.push');

module.exports = function entries(O: string): any[] {
	var obj: object = RequireObjectCoercible(O);
	var entrys: any[] = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(entrys, [key, obj[key]]);
		}
	}
	return entrys;
};
