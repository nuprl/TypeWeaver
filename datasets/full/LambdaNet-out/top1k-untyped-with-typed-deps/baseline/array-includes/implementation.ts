'use strict';

var ToIntegerOrInfinity: Function = require('es-abstract/2021/ToIntegerOrInfinity');
var ToLength: Function = require('es-abstract/2021/ToLength');
var ToObject: Function = require('es-abstract/2021/ToObject');
var SameValueZero: Function = require('es-abstract/2021/SameValueZero');
var $isNaN: Function = require('es-abstract/helpers/isNaN');
var $isFinite: Function = require('es-abstract/helpers/isFinite');
var GetIntrinsic: Function = require('get-intrinsic');
var callBound: Function = require('call-bind/callBound');
var isString: Function = require('is-string');

var $charAt: Function = callBound('String.prototype.charAt');
var $indexOf: any[] = GetIntrinsic('%Array.prototype.indexOf%'); // TODO: use callBind.apply without breaking IE 8
var $max: Function = GetIntrinsic('%Math.max%');

module.exports = function includes(searchElement: HTMLElement): boolean {
	var fromIndex: number = arguments.length > 1 ? ToIntegerOrInfinity(arguments[1]) : 0;
	if ($indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return $indexOf.apply(this, arguments) > -1;
	}

	var O: any[] = ToObject(this);
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
