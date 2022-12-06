"use strict";

import coerceToInteger from '../integer/coerce';

export default function (value: number) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};