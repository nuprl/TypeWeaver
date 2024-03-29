"use strict";

var coerceToSafeInteger = require("../safe-integer/coerce");

module.exports = function (value: number) {
	value = coerceToSafeInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};