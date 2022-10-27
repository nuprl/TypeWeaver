"use strict";

import isValue from '../value/is';

export default function (value): string {
	if (!isValue(value)) return null;
	try {
		value = +value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
	if (isNaN(value)) return null;
	return value;
};
