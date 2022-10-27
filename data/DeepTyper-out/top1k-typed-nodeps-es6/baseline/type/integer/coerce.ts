"use strict";

import coerceToFinite from '../finite/coerce';

var abs: number = Math.abs, floor = Math.floor;

export default function (value): number {
	value = coerceToFinite(value);
	if (!value) return value;
	return (value > 0 ? 1 : -1) * floor(abs(value));
};
