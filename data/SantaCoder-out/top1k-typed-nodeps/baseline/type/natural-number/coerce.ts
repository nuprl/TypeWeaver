"use strict";

var coerceToInteger = require("../integer/coerce");

module.exports = function (value: unknown) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};