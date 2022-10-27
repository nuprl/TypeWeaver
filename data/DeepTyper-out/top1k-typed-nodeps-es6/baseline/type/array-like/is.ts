"use strict";

import coerceToArrayLength from '../array-length/coerce';
import isObject from '../object/is';

export default function (value/*, options*/): any {
	if (!isObject(value)) {
		var options: any = arguments[1];
		if (isObject(options) && options.allowString && typeof value === "string") return true;
		return false;
	}

	if (typeof value === "function") return false;

	var length: number;
	try { length = value.length; }
	catch (error) { return false; }

	if (coerceToArrayLength(length) === null) return false;
	return true;
};
