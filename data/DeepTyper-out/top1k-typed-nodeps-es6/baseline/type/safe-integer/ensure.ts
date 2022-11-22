"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value: any/*, options*/) {
	var coerced: any = coerce(value);
	if (coerced !== null) return coerced;
	var options: any = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected a safe integer for %n, received %v"
			: "%v is not a safe integer";
	return resolveException(value, errorMessage, options);
};
