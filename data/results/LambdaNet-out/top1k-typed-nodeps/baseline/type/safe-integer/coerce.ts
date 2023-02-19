"use strict";

var coerceToInteger: Function = require("../integer/coerce");

var MAX_SAFE_INTEGER: number = 9007199254740991, MIN_SAFE_INTEGER: number = -9007199254740991;

module.exports = function (value: number) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value > MAX_SAFE_INTEGER) return null;
	if (value < MIN_SAFE_INTEGER) return null;
	return value;
};
