"use strict";

var coerceToInteger: any = require("../integer/coerce");

var abs: number = Math.abs;

module.exports = function (value: any) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (abs(value) > 8.64e15) return null;
	return value;
};
