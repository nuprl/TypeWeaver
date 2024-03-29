"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value: string/*, options*/) {
	var coerced: number = coerce(value);
	if (coerced !== null) return coerced;
	var options: object = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected an integer for %n, received %v"
			: "%v is not an integer";
	return resolveException(value, errorMessage, options);
};
