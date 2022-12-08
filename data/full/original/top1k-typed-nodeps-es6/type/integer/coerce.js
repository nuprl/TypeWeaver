"use strict";

import coerceToFinite from '../finite/coerce';

var abs = Math.abs, floor = Math.floor;

export default function (value) {
	value = coerceToFinite(value);
	if (!value) return value;
	return (value > 0 ? 1 : -1) * floor(abs(value));
};
