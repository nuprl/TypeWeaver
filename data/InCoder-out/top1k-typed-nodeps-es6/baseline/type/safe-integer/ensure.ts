"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value/*: any,  options*/: Object) {
	var coerced = coerce(value);
	if (coerced !== null) return coerced;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a safe integer for %n, received %v"
			: "%v is not a safe integer";
	return resolveException(value, errorMessage, options);
};