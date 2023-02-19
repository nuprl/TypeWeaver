"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value: any/*, options*/) {
	if (is(value)) return value;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name ? "Expected an error for %n, received %v" : "%v is not an error";
	return resolveException(value, errorMessage, options);
};
