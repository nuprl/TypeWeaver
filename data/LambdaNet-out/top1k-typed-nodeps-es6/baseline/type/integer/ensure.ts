"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value: String/*, options*/) {
	var coerced: Number = coerce(value);
	if (coerced !== null) return coerced;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name
			? "Expected an integer for %n, received %v"
			: "%v is not an integer";
	return resolveException(value, errorMessage, options);
};