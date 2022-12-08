"use strict";

var coerceToSafeInteger: any = require("../safe-integer/coerce");

module.exports = function (value: string) {
	value = coerceToSafeInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};
