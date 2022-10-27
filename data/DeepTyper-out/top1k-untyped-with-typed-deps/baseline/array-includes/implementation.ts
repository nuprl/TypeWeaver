'use strict';

var ToIntegerOrInfinity: any = require('es-abstract/2021/ToIntegerOrInfinity');
var ToLength: any = require('es-abstract/2021/ToLength');
var ToObject: any = require('es-abstract/2021/ToObject');
var SameValueZero: any = require('es-abstract/2021/SameValueZero');
var $isNaN = require('es-abstract/helpers/isNaN');
var $isFinite = require('es-abstract/helpers/isFinite');
var GetIntrinsic: any = require('get-intrinsic');
var callBound: any = require('call-bind/callBound');
var isString: any = require('is-string');

var $charAt = callBound('String.prototype.charAt');
var $indexOf = GetIntrinsic('%Array.prototype.indexOf%'); // TODO: use callBind.apply without breaking IE 8
var $max = GetIntrinsic('%Math.max%');

module.exports = function includes(searchElement: any): any {
	var fromIndex: number = arguments.length > 1 ? ToIntegerOrInfinity(arguments[1]) : 0;
	if ($indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return $indexOf.apply(this, arguments) > -1;
	}

	var O: any = ToObject(this);
	var length: number = ToLength(O.length);
	if (length === 0) {
		return false;
	}
	var k: number = fromIndex >= 0 ? fromIndex : $max(0, length + fromIndex);
	while (k < length) {
		if (SameValueZero(searchElement, isString(O) ? $charAt(O, k) : O[k])) {
			return true;
		}
		k += 1;
	}
	return false;
};
