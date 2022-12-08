"use strict";

import coerceToNumber from '../number/coerce';

export default function (value: number) {
	value = coerceToNumber(value);
	return isFinite(value) ? value : null;
};