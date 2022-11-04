"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*, options*/): any {
	if (is(value)) return value;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name ? "Expected a date for %n, received %v" : "%v is not a date";
	return resolveException(value, errorMessage, options);
};