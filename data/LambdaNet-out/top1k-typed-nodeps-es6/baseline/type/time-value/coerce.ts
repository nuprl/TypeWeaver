"use strict";

import coerceToInteger from '../integer/coerce';

var abs: Function = Math.abs;

export default function (value: number) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (abs(value) > 8.64e15) return null;
	return value;
};
