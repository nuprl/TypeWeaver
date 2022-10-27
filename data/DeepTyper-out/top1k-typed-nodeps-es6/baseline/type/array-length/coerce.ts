"use strict";

import coerceToSafeInteger from '../safe-integer/coerce';

export default function (value): string {
	value = coerceToSafeInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};
