"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*, options*/) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name ? "Expected a promise for %n, received %v" : "%v is not a promise";
	return resolveException(value, errorMessage, options);
};
