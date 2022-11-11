"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value /*: mixed,  options*/: any) {
	var coerced = coerce(value);
	if (coerced !== null) return coerced;
	var options = arguments[1];
	var errorMessage =
		options && options.name ? "Expected bigint for %n, received %v" : "%v is not a bigint";
	return resolveException(value, errorMessage, options);
};