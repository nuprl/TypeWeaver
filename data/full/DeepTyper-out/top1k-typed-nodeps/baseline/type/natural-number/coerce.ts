"use strict";

var coerceToInteger: any = require("../integer/coerce");

module.exports = function (value: string) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};
