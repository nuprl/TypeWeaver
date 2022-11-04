"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value: String /*, options*/) {
	if (is(value)) return value;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name
			? "Expected a constructor function for %n, received %v"
			: "%v is not a constructor function";
	return resolveException(value, errorMessage, options);
};