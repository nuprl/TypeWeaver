"use strict";

import resolveException from '../lib/resolve-exception';
import coerce from './coerce';

export default function (value: String/*, options*/) {
	var coerced: Number = coerce(value);
	if (coerced !== null) return coerced;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name
			? "Expected a time value for %n, received %v"
			: "%v is not a time value";
	return resolveException(value, errorMessage, options);
};
