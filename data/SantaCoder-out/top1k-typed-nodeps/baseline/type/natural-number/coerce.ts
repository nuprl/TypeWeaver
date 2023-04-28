"use strict";

var coerceToInteger = require("../integer/coerce");

module.exports = function (value: any) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};