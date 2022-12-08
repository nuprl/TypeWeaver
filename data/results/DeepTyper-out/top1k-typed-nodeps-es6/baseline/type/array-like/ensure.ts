"use strict";

import resolveException from '../lib/resolve-exception';
import is from './is';

export default function (value: any/*, options*/) {
	if (is(value, arguments[1])) return value;
	var options: any = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected an array like for %n, received %v"
			: "%v is not an array like";
	return resolveException(value, errorMessage, options);
};
