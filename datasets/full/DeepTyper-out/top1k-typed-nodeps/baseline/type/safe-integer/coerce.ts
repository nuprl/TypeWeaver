"use strict";

var coerceToInteger: any = require("../integer/coerce");

var MAX_SAFE_INTEGER: number = 9007199254740991, MIN_SAFE_INTEGER = -9007199254740991;

module.exports = function (value: any) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value > MAX_SAFE_INTEGER) return null;
	if (value < MIN_SAFE_INTEGER) return null;
	return value;
};
