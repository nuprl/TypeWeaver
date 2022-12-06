"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*: Object,  options*/: Object) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a regular expression for %n, received %v"
			: "%v is not a regular expression";
	return resolveException(value, errorMessage, options);
};