"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value/*: any, options*/: Options) {
	var coerced = coerce(value);
	if (coerced !== null) return coerced;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected an integer for %n, received %v"
			: "%v is not an integer";
	return resolveException(value, errorMessage, options);
};