"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value/*: any, options*/: Options) {
	var coerced = coerce(value);
	if (coerced !== null) return coerced;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a time value for %n, received %v"
			: "%v is not a time value";
	return resolveException(value, errorMessage, options);
};