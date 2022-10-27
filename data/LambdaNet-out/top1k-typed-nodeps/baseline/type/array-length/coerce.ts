"use strict";

var coerceToSafeInteger: Function = require("../safe-integer/coerce");

module.exports = function (value: Number) {
	value = coerceToSafeInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};
