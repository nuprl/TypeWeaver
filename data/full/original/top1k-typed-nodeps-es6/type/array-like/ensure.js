"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value/*, options*/) {
	if (is(value, arguments[1])) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected an array like for %n, received %v"
			: "%v is not an array like";
	return resolveException(value, errorMessage, options);
};
