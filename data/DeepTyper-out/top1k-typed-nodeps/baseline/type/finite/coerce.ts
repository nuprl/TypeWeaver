"use strict";

var coerceToNumber: any = require("../number/coerce");

module.exports = function (value: string) {
	value = coerceToNumber(value);
	return isFinite(value) ? value : null;
};
