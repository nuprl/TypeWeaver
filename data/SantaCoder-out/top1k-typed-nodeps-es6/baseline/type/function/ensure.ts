"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*: any, options*/: Options) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a function for %n, received %v"
			: "%v is not a function";
	return resolveException(value, errorMessage, options);
};