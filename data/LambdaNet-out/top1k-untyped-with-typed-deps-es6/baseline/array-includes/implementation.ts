'use strict';

import ToIntegerOrInfinity from 'es-abstract/2021/ToIntegerOrInfinity';
import ToLength from 'es-abstract/2021/ToLength';
import ToObject from 'es-abstract/2021/ToObject';
import SameValueZero from 'es-abstract/2021/SameValueZero';
import $isNaN from 'es-abstract/helpers/isNaN';
import $isFinite from 'es-abstract/helpers/isFinite';
import GetIntrinsic from 'get-intrinsic';
import callBound from 'call-bind/callBound';
import isString from 'is-string';

var $charAt: Function = callBound('String.prototype.charAt');
var $indexOf: any[] = GetIntrinsic('%Array.prototype.indexOf%'); // TODO: use callBind.apply without breaking IE 8
var $max: Function = GetIntrinsic('%Math.max%');

export default function includes(searchElement: HTMLElement): boolean {
	var fromIndex: number = arguments.length > 1 ? ToIntegerOrInfinity(arguments[1]) : 0;
	if ($indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return $indexOf.apply(this, arguments) > -1;
	}

	var O: any[] = ToObject(this);
	var length: string = ToLength(O.length);
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
