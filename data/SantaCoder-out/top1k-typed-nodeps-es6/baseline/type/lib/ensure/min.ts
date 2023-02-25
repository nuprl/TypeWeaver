"use strict";

import resolveException from '../resolve-exception';

export default function (value: any, coerced: any, options: IOptions) {
	if (coerced >= options.min) return coerced;
	var errorMessage =
		options && options.name
			? "Expected %n to be greater or equal " + options.min + ", received %v"
			: "%v is not greater or equal " + options.min;
	return resolveException(value, errorMessage, options);
};