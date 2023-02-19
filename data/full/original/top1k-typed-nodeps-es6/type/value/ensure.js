"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*, options*/) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name ? "Expected a value for %n, received %v" : "Cannot use %v";
	return resolveException(value, errorMessage, options);
};
