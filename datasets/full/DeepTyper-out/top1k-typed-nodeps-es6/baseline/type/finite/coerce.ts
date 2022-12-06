"use strict";

import coerceToNumber from '../number/coerce';

export default function (value: string) {
	value = coerceToNumber(value);
	return isFinite(value) ? value : null;
};
